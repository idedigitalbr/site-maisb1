import sanitizeHtml from 'sanitize-html';
import { DomUtils, parseDocument } from 'htmlparser2';

type HtmlNode = ReturnType<typeof parseDocument>['children'][number];

function normalizeLists(nodes: HtmlNode[]): HtmlNode[] {
  return nodes.flatMap((node): HtmlNode[] => {
    if (node.type !== 'tag') return [node];
    node.children = normalizeLists(node.children);
    const items = node.children.filter((child) => child.type !== 'text' || child.data.trim());
    if ((node.name !== 'ol' && node.name !== 'ul') || !items.length
      || !items.every((child) => child.type === 'tag' && child.name === 'li')
      || !items.some((child) => child.type === 'tag' && child.attribs['data-list'])) return [node];

    const groups: HtmlNode[] = [];
    let group: typeof node | undefined;
    for (const item of items) {
      if (item.type !== 'tag') continue;
      const type = item.attribs['data-list'] === 'bullet' ? 'ul'
        : item.attribs['data-list'] === 'ordered' ? 'ol' : node.name;
      delete item.attribs['data-list'];
      if (!group || group.name !== type) {
        const container = parseDocument(`<${type}></${type}>`).children[0];
        if (container.type !== 'tag') continue;
        group = container;
        groups.push(group);
      }
      group.children.push(item);
      item.parent = group;
    }
    return groups;
  });
}

export function cleanArticleHtml(html: string) {
  const cleaned = sanitizeHtml(html.replace(/&nbsp;/gi, ' ').replace(/\u00a0/g, ' '), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'u', 'img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class'], a: ['href', 'target', 'rel'],
      li: ['class', 'data-list'], img: ['src', 'alt', 'width', 'height', 'loading', 'decoding'],
    },
    allowedClasses: { '*': [/^ql-align-(center|right|justify)$/] },
    transformTags: {
      img: (tagName, attributes) => ({ tagName, attribs: { ...attributes, loading: 'lazy', decoding: 'async' } }),
      li: (tagName, attributes) => {
        if (!['bullet', 'ordered'].includes(attributes['data-list'])) delete attributes['data-list'];
        return { tagName, attribs: attributes };
      },
    },
  });
  const document = parseDocument(cleaned);
  document.children = normalizeLists(document.children);
  return DomUtils.getOuterHTML(document);
}

export function hasArticleContent(cleanedHtml: string) {
  const document = parseDocument(cleanedHtml);
  const text = DomUtils.textContent(document).replace(/[\s\u200b\ufeff]+/g, ' ').trim();
  return Boolean(text && text !== 'Comece a escrever a matéria...')
    || DomUtils.getElementsByTagName('img', document.children, true).some((image) => Boolean(image.attribs.src));
}
