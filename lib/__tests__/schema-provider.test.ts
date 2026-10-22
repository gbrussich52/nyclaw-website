// classification: PRIVATE
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { OrganizationJsonLd, ServiceOverviewJsonLd } from '../../app/components/JsonLd'

describe('published agency schema', () => {
  // Vitest's standalone TSX transform uses the classic JSX runtime.
  beforeAll(() => vi.stubGlobal('React', React))
  afterAll(() => vi.unstubAllGlobals())

  it('puts serviceType on Service and resolves its real provider without inventing an office', () => {
    const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
      React.createElement(ServiceOverviewJsonLd), React.createElement(OrganizationJsonLd)))
    const nodes = [...html.matchAll(/<script[^>]*>(.*?)<\/script>/g)].map(match => JSON.parse(match[1]))
    const service = nodes.find(node => node['@type'] === 'Service')
    const provider = nodes.find(node => node['@type'] === 'Organization')
    expect(service.serviceType).toContain('Workflow Automation')
    expect(service.provider['@id']).toBe(provider['@id'])
    expect(service).not.toHaveProperty('priceRange')
    expect(service).not.toHaveProperty('address')
    expect(nodes.some(node => node['@type'] === 'ProfessionalService')).toBe(false)
  })
})
