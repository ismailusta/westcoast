/**
 * Lexical JSON'ı HTML'e çevirir
 */
export function lexicalToHtml(lexicalData: unknown): string {
  if (!lexicalData || typeof lexicalData !== 'object') {
    return ''
  }

  if (typeof lexicalData === 'string') {
    return lexicalData
  }

  // Lexical JSON formatı
  const data = lexicalData as Record<string, unknown>
  if (data.root && typeof data.root === 'object' && data.root !== null) {
    const root = data.root as Record<string, unknown>
    if (root.children && Array.isArray(root.children)) {
      return serializeNodes(root.children)
    }
  }

  return ''
}

function serializeNodes(nodes: unknown[]): string {
  if (!Array.isArray(nodes)) {
    return ''
  }

  return nodes.map(node => serializeNode(node)).join('')
}

function serializeNode(node: unknown): string {
  if (!node || typeof node !== 'object') {
    return ''
  }

  const nodeObj = node as Record<string, unknown>
  const nodeType = (nodeObj.type as string) || ''
  const text = (nodeObj.text as string) || ''
  const children = (nodeObj.children as unknown[]) || []

  switch (nodeType) {
    case 'paragraph':
      return `<p>${serializeNodes(children)}</p>`
    
    case 'heading':
      const tag = `h${(nodeObj.tag as string) || '1'}`
      return `<${tag}>${serializeNodes(children)}</${tag}>`
    
    case 'list':
      const listTag = (nodeObj.listType as string) === 'number' ? 'ol' : 'ul'
      return `<${listTag}>${serializeNodes(children)}</${listTag}>`
    
    case 'listitem':
      return `<li>${serializeNodes(children)}</li>`
    
    case 'link':
      const url = (nodeObj.url as string) || '#'
      return `<a href="${url}">${serializeNodes(children)}</a>`
    
    case 'text':
      let content = text
      const format = nodeObj.format as number | undefined
      if (format) {
        if (format & 1) content = `<strong>${content}</strong>` // bold
        if (format & 2) content = `<em>${content}</em>` // italic
        if (format & 4) content = `<u>${content}</u>` // underline
        if (format & 8) content = `<code>${content}</code>` // code
      }
      return content
    
    case 'linebreak':
      return '<br>'
    
    default:
      // Bilinmeyen node tipi için children'ları serialize et
      if (children.length > 0) {
        return serializeNodes(children)
      }
      return text || ''
  }
}

