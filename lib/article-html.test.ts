import { describe, expect, it } from 'vitest';
import { cleanArticleHtml, hasArticleContent } from './article-html';

describe('article formatting and meaningful content', () => {
  it('preserves safe alignment and converts mixed Quill lists to semantic groups', () => {
    const html = cleanArticleHtml('<p class="ql-align-center arbitrary" onclick="alert(1)">Centro</p><ol><li data-list="bullet">A</li><li data-list="ordered">B</li><li data-list="bullet">C</li></ol>');
    expect(html).toContain('<p class="ql-align-center">Centro</p>');
    expect(html).toContain('<ul><li>A</li></ul><ol><li>B</li></ol><ul><li>C</li></ul>');
    expect(html).not.toContain('onclick');
    expect(html).not.toContain('arbitrary');
    expect(cleanArticleHtml(html)).toBe(html);
  });

  it.each(['<p><br></p>', '<script>alert(1)</script>', '<p>&nbsp;\u200b</p>', '<p>Comece a escrever a matéria...</p>'])('rejects an empty or placeholder article: %s', (html) => {
    expect(hasArticleContent(cleanArticleHtml(html))).toBe(false);
  });

  it('accepts text or a safe inline image while removing unsafe image sources', () => {
    expect(hasArticleContent(cleanArticleHtml('<p>Conteúdo real</p>'))).toBe(true);
    expect(hasArticleContent(cleanArticleHtml('<img src="/uploads/photo.webp">'))).toBe(true);
    expect(hasArticleContent(cleanArticleHtml('<img src="javascript:alert(1)">'))).toBe(false);
  });
});
