/**
 * Lexical JSON'ı HTML'e çevirir
 */
export function lexicalToHtml(lexicalData: any): string {
  if (!lexicalData || typeof lexicalData !== 'object') {
    return ''
  }

  if (typeof lexicalData === 'string') {
    return lexicalData
  }

  // Lexical JSON formatı
  if (lexicalData.root && lexicalData.root.children) {
    return serializeNodes(lexicalData.root.children)
  }

  return ''
}

function serializeNodes(nodes: any[]): string {
  if (!Array.isArray(nodes)) {
    return ''
  }

  return nodes.map(node => serializeNode(node)).join('')
}

function serializeNode(node: any): string {
  if (!node) {
    return ''
  }

  const nodeType = node.type || ''
  const text = node.text || ''
  const children = node.children || []

  switch (nodeType) {
    case 'paragraph':
      return `<p>${serializeNodes(children)}</p>`
    
    case 'heading':
      const tag = `h${node.tag || '1'}`
      return `<${tag}>${serializeNodes(children)}</${tag}>`
    
    case 'list':
      const listTag = node.listType === 'number' ? 'ol' : 'ul'
      return `<${listTag}>${serializeNodes(children)}</${listTag}>`
    
    case 'listitem':
      return `<li>${serializeNodes(children)}</li>`
    
    case 'link':
      const url = node.url || '#'
      return `<a href="${url}">${serializeNodes(children)}</a>`
    
    case 'text':
      let content = text
      if (node.format) {
        if (node.format & 1) content = `<strong>${content}</strong>` // bold
        if (node.format & 2) content = `<em>${content}</em>` // italic
        if (node.format & 4) content = `<u>${content}</u>` // underline
        if (node.format & 8) content = `<code>${content}</code>` // code
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

