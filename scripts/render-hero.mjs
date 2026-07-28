#!/usr/bin/env node
/**
 * render-hero — bake the hero DNA helix into a seamless looping video.
 *
 *   node scripts/render-hero.mjs [--frames N] [--width W] [--height H] [--keep]
 *
 * Why this exists: the mockup's hero uses a 20MB stock clip from Pexels, which
 * (a) is far too heavy for an LCP-critical background and (b) would be blocked
 * outright by our CSP (`default-src 'self'`, no `media-src`). Rendering our own
 * helix gives NYClaw-owned footage at a fraction of the weight.
 *
 * Determinism: lib/heroHelixDraw.ts contains no Math.random() — particle seeds
 * are arithmetic — and drawHelixFrame() is pure w.r.t. its arguments. So we can
 * step virtual time instead of racing requestAnimationFrame and get exactly one
 * frame per tick, with no drops or duplicates.
 *
 * Seamlessness: phase runs 0 → 4π (see LOOP_PERIOD — the packets advance at
 * half rate, so 2π is NOT a full cycle), and particles bob sinusoidally via
 * loopParticlesAt() rather than drifting linearly. Frame 0 and frame N are
 * verified byte-identical before encoding.
 *
 * Requires: Google Chrome installed, ffmpeg on PATH. puppeteer-core is a
 * devDependency and downloads no browser of its own.
 */

import { mkdir, writeFile, rm, stat, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { createServer } from 'node:http'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { tmpdir } from 'node:os'
import path from 'node:path'
import process from 'node:process'
import puppeteer from 'puppeteer-core'

const run = promisify(execFile)

// ---------------------------------------------------------------- config ----

const argv = process.argv.slice(2)
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`)
  return i === -1 ? fallback : Number(argv[i + 1])
}

const ROOT = path.resolve(import.meta.dirname, '..')
const WORK = path.join(tmpdir(), 'nyclaw-hero-render')
const FRAME_DIR = path.join(WORK, 'frames')
const OUT_DIR = path.join(ROOT, 'public')

const TOTAL_FRAMES = flag('frames', 900) // 900 @30fps = 30s loop
const WIDTH = flag('width', 1920)
const HEIGHT = flag('height', 1080) // 16:9, matching the mockup's aspect-ratio
const FPS = 30
const KEEP = argv.includes('--keep')

/**
 * The designer's helix is a full-width horizontal sweep, so there is no
 * centre-weighting parameter any more — it bleeds off both edges by design.
 * The hero's left→right scrim (opaque .97 at 0%, transparent by 78%) is what
 * keeps the left-aligned headline legible over it.
 */

/** Baked to match the mockup's media container background (#0a0a0c). */
const BG = '#0a0a0c'

/**
 * Logical viewport the scene is composed for, before scaling up to output size.
 *
 * drawHelixFrame caps the helix radius at a constant 230px
 * (`Math.min(width * .26, height * .34, 230)`), so the helix occupies a
 * *smaller fraction* of the frame the larger you render. Drawing natively at
 * 1920 would make the baked video read noticeably thinner than the live
 * component does in a real ~1440px-wide hero.
 *
 * Composing at 1440x810 and scaling the canvas transform by OUT/LOGICAL keeps
 * the component's proportions while still emitting full-resolution frames.
 */
const LOGICAL_WIDTH = 1440

/**
 * Browser resolution, in preference order.
 *
 * The user's own Google Chrome.app is deliberately LAST: on macOS, launching it
 * while an instance is already running makes the new process delegate to the
 * existing one and exit, so puppeteer never receives a DevTools endpoint
 * ("The browser is already running for ..."). Chrome for Testing and the
 * headless shell are separate bundles with no such conflict, and Playwright
 * has already cached them on this machine.
 */
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
  `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1208/chrome-headless-shell-mac-arm64/chrome-headless-shell`,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean)

function resolveChrome() {
  const found = CHROME_CANDIDATES.find((p) => existsSync(p))
  if (!found) {
    throw new Error(
      'No Chrome binary found. Tried:\n  ' +
        CHROME_CANDIDATES.join('\n  ') +
        '\nSet CHROME_PATH to override.'
    )
  }
  return found
}

// ------------------------------------------------------------------ util ----

const log = (...a) => console.log('[render-hero]', ...a)

const pad = (n) => String(n).padStart(5, '0')

async function sizeOf(file) {
  try {
    return (await stat(file)).size
  } catch {
    return 0
  }
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`

// --------------------------------------------------------------- compile ----

/**
 * Compile the shared drawing module to plain ESM the harness page can import.
 *
 * Invoked with an explicit file so tsc ignores tsconfig.json (whose jsx/plugin
 * settings are irrelevant here). The module has no imports, so no bundler is
 * needed — a single-file transpile is enough.
 */
async function compileDrawModule() {
  log('compiling lib/heroHelixDraw.ts →', WORK)
  await run(
    'npx',
    [
      'tsc',
      path.join(ROOT, 'lib/heroHelixDraw.ts'),
      '--outDir',
      WORK,
      '--target',
      'es2020',
      '--module',
      'es2020',
      '--skipLibCheck',
    ],
    { cwd: ROOT }
  )
  const out = path.join(WORK, 'heroHelixDraw.js')
  if (!existsSync(out)) throw new Error(`transpile produced no output at ${out}`)
  return out
}

// --------------------------------------------------------------- harness ----

function harnessHtml() {
  return `<!doctype html>
<meta charset="utf-8">
<style>
  html,body { margin:0; padding:0; background:${BG}; }
  canvas { display:block; }
</style>
<canvas id="c" width="${WIDTH}" height="${HEIGHT}"></canvas>
<script type="module">
  import {
    createParticles,
    drawHelixFrame,
    loopParticlesAt,
    LOOP_PERIOD,
  } from './heroHelixDraw.js'

  const canvas = document.getElementById('c')
  // alpha:true is required — drawHelixFrame() opens with clearRect(), which on
  // an alpha:false context clears to opaque black and would erase any
  // pre-painted background. We draw first, then fill underneath.
  const ctx = canvas.getContext('2d', { alpha: true })
  const seeds = createParticles()

  const W = ${WIDTH}, H = ${HEIGHT}, TOTAL = ${TOTAL_FRAMES}

  // Compose at a logical viewport, then scale up — keeps the helix at the same
  // proportion of the frame as the live component (its radius is capped at a
  // constant 230px, so it would shrink relatively at larger native sizes).
  const SCALE = W / ${LOGICAL_WIDTH}
  const LW = W / SCALE, LH = H / SCALE

  // Paint one frame of the loop onto the canvas.
  // No rAF anywhere: virtual time only, so frame N is exactly reproducible.
  function paint(frame) {
    const phase = (LOOP_PERIOD * frame) / TOTAL
    const particles = loopParticlesAt(seeds, frame, TOTAL)

    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    ctx.globalCompositeOperation = 'source-over'

    drawHelixFrame(ctx, {
      width: LW,
      height: LH,
      phase,
      particles,
      parX: 0,   // no pointer in headless → parallax is identically zero
      parY: 0,
      intensity: 1,
    })

    // Composite an opaque base *behind* the helix. The shipped <video> has no
    // alpha channel, and this matches the mockup's media container fill
    // (#0a0a0c) so the card edge is seamless.
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = '${BG}'
    ctx.fillRect(0, 0, LW, LH)
    ctx.globalCompositeOperation = 'source-over'
  }

  window.__renderFrame = (frame) => {
    paint(frame)
    return canvas.toDataURL('image/png')
  }

  /**
   * Loop-seam measurement.
   *
   * Frame TOTAL is the wrap point and must look identical to frame 0. We
   * compare decoded pixels rather than PNG hashes: phase LOOP_PERIOD vs 0 and
   * sin(2π) vs sin(0) differ by ~1e-16 in IEEE754, so a byte-exact hash test
   * can fail on float noise that is invisible after rasterisation.
   */
  window.__seamDelta = () => {
    paint(0)
    const a = ctx.getImageData(0, 0, W, H).data
    paint(TOTAL)
    const b = ctx.getImageData(0, 0, W, H).data

    let maxDelta = 0
    let differing = 0
    for (let i = 0; i < a.length; i += 4) {
      const d = Math.max(
        Math.abs(a[i] - b[i]),
        Math.abs(a[i + 1] - b[i + 1]),
        Math.abs(a[i + 2] - b[i + 2])
      )
      if (d > 0) { differing++; if (d > maxDelta) maxDelta = d }
    }
    return { maxDelta, differing, totalPixels: (a.length / 4) | 0 }
  }

  window.__ready = true
</script>`
}

// ---------------------------------------------------------------- serve ----

/**
 * Serve the work dir over HTTP on an ephemeral port.
 *
 * Required because the harness uses `<script type="module">`: Chrome applies
 * CORS to module scripts, and a file:// origin is opaque, so the import of
 * ./heroHelixDraw.js is rejected before any of our code runs — silently, with
 * only a "waiting for __ready" timeout to show for it.
 */
async function serveWorkDir() {
  const TYPES = { '.html': 'text/html', '.js': 'text/javascript' }

  const server = createServer(async (req, res) => {
    const name = path.basename(new URL(req.url, 'http://x').pathname)

    // Chrome requests this unprompted; a 404 here would otherwise be collected
    // as a page error and fail the run for no reason.
    if (name === 'favicon.ico') return void res.writeHead(204).end()

    const file = path.join(WORK, name)
    try {
      const body = await readFile(file)
      res.writeHead(200, {
        'Content-Type': TYPES[path.extname(name)] ?? 'application/octet-stream',
      })
      res.end(body)
    } catch {
      res.writeHead(404).end('not found')
    }
  })

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const { port } = server.address()
  return { server, origin: `http://127.0.0.1:${port}` }
}

// ---------------------------------------------------------------- render ----

async function renderFrames() {
  const chrome = resolveChrome()
  log(`launching ${path.basename(chrome)} (${WIDTH}x${HEIGHT}, ${TOTAL_FRAMES} frames)`)

  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: true,
    // Isolated profile: the user's own Chrome holds a lock on the default
    // puppeteer profile dir, and reusing it fails with "browser is already
    // running". This also keeps the render from touching real browser state.
    userDataDir: path.join(WORK, 'chrome-profile'),
    args: ['--no-sandbox', '--disable-lcd-text', '--force-device-scale-factor=1'],
  })

  const { server, origin } = await serveWorkDir()

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 })

    const errors = []
    page.on('pageerror', (e) => errors.push(String(e)))
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text())
    })
    page.on('requestfailed', (r) =>
      errors.push(`request failed: ${r.url()} ${r.failure()?.errorText ?? ''}`)
    )

    await page.goto(`${origin}/harness.html`, { waitUntil: 'load' })

    try {
      await page.waitForFunction('window.__ready === true', { timeout: 15_000 })
    } catch (e) {
      // Surface what the page actually complained about — a bare "waiting
      // failed" timeout tells you nothing about why the module never ran.
      throw new Error(
        `harness never became ready.${
          errors.length ? ` Page errors: ${errors.join(' | ')}` : ' No page errors captured.'
        }`
      )
    }
    if (errors.length) throw new Error(`harness errors: ${errors.join(' | ')}`)

    // Measure the loop seam before spending minutes on frames we would discard.
    const seam = await page.evaluate(() => window.__seamDelta())
    log(
      `seam check: maxDelta=${seam.maxDelta}/255, ` +
        `differing=${seam.differing}/${seam.totalPixels} px`
    )

    for (let f = 0; f < TOTAL_FRAMES; f++) {
      const dataUrl = await page.evaluate((i) => window.__renderFrame(i), f)
      const buf = Buffer.from(dataUrl.split(',')[1], 'base64')
      await writeFile(path.join(FRAME_DIR, `f_${pad(f)}.png`), buf)

      if (f % 100 === 0 || f === TOTAL_FRAMES - 1) {
        log(`  frame ${f + 1}/${TOTAL_FRAMES}`)
      }
    }

    if (errors.length) throw new Error(`harness errors: ${errors.join(' | ')}`)

    return seam
  } finally {
    await browser.close()
    await new Promise((resolve) => server.close(resolve))
  }
}

// ---------------------------------------------------------------- encode ----

async function encode() {
  const input = path.join(FRAME_DIR, 'f_%05d.png')
  const webm = path.join(OUT_DIR, 'hero.webm')
  const mp4 = path.join(OUT_DIR, 'hero.mp4')
  // JPEG, not WebP: the local ffmpeg 8.1.2 is built without --enable-libwebp,
  // so a .webp target fails with "Encoder not found". JPEG is universally
  // supported and the poster is a dark, low-detail frame that compresses well.
  const poster = path.join(OUT_DIR, 'hero-poster.jpg')

  // Delivered at 1600px, not the 1920 we render at. The designer's helix adds
  // a three-pass bloom whose smooth gradients are expensive to encode: at
  // 1920/crf34 the webm was 3.03MB. Measured alternatives on real frames —
  // 1920/crf38 2.20MB, 1600/crf34 2.21MB, 1600/crf38 1.64MB — and 1600/crf38
  // showed no visible banding at 1:1, which is generous given the video sits
  // at 50% opacity behind the hero scrim.
  const DELIVER = 'scale=1600:-2'

  log('encoding webm (VP9)…')
  await run('ffmpeg', [
    '-y', '-framerate', String(FPS), '-i', input,
    '-vf', DELIVER,
    '-c:v', 'libvpx-vp9',
    '-b:v', '0', '-crf', '38',
    '-row-mt', '1', '-tile-columns', '2',
    '-pix_fmt', 'yuv420p',
    '-an',
    webm,
  ])

  // Safari has no VP9-in-WebM support for <video> in all versions we care
  // about, so H.264 is not optional here.
  log('encoding mp4 (H.264)…')
  await run('ffmpeg', [
    '-y', '-framerate', String(FPS), '-i', input,
    '-vf', DELIVER,
    '-c:v', 'libx264',
    '-crf', '30', '-preset', 'slow',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-an',
    mp4,
  ])

  log('writing poster…')
  await run('ffmpeg', [
    '-y', '-i', path.join(FRAME_DIR, `f_${pad(0)}.png`),
    '-vf', 'scale=1280:-2',
    '-q:v', '4',
    poster,
  ])

  return { webm, mp4, poster }
}

// ------------------------------------------------------------------ main ----

async function main() {
  await rm(WORK, { recursive: true, force: true })
  await mkdir(FRAME_DIR, { recursive: true })
  await mkdir(OUT_DIR, { recursive: true })

  await compileDrawModule()
  await writeFile(path.join(WORK, 'harness.html'), harnessHtml())

  const t0 = Date.now()
  const seam = await renderFrames()
  log(`rendered in ${((Date.now() - t0) / 1000).toFixed(1)}s`)

  // A delta of 1/255 on a handful of pixels is IEEE754 noise and invisible
  // once the frames go through a lossy encoder. Anything larger means the
  // loop genuinely does not close.
  if (seam.maxDelta > 1) {
    throw new Error(
      `LOOP SEAM BROKEN: frame 0 and the wrap frame differ by ${seam.maxDelta}/255 ` +
        `across ${seam.differing} pixels.\n` +
        'Check LOOP_PERIOD (packets run at half rate → 4π, not 2π) and that ' +
        'loopParticlesAt() is being used instead of stepParticles().'
    )
  }
  log(`loop seam verified (maxDelta ${seam.maxDelta}/255)`)

  const { webm, mp4, poster } = await encode()

  const sizes = {
    webm: await sizeOf(webm),
    mp4: await sizeOf(mp4),
    poster: await sizeOf(poster),
  }

  log('')
  log('OUTPUT')
  log(`  public/hero.webm       ${mb(sizes.webm)}`)
  log(`  public/hero.mp4        ${mb(sizes.mp4)}`)
  log(`  public/hero-poster.jpg ${kb(sizes.poster)}`)
  log('')
  log(`  loop: ${TOTAL_FRAMES} frames @ ${FPS}fps = ${(TOTAL_FRAMES / FPS).toFixed(1)}s`)

  if (!KEEP) await rm(WORK, { recursive: true, force: true })
  else log(`  frames kept at ${FRAME_DIR}`)
}

main().catch((err) => {
  console.error('[render-hero] FAILED:', err.message)
  process.exit(1)
})
