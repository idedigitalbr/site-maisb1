import { cleanArticleHtml, hasArticleContent } from './article-html';
import { db } from './db';
import type { GalleryImage } from './types';

export const postCategories = ['Institucional', '+B Supermercados', '+B Farma', 'Villa Plaza', 'The Wine Experience', 'Eventos', 'Expansão', 'Geral'] as const;
export type PostStatus = 'draft' | 'published';

export type CmsPostInput = {
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  author: string;
  bodyHtml: string;
  status: PostStatus;
  seoTitle: string;
  seoDescription: string;
  imagePath?: string;
  imageCardPath?: string;
  imageAlt: string;
  imageCaption: string;
  gallery: GalleryImage[];
  noIndex: boolean;
};

export type CmsPost = CmsPostInput & {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};


const normalizeGallery = (value: unknown): GalleryImage[] => {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 12).flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const candidate = item as { url?: unknown; alt?: unknown; caption?: unknown; width?: unknown; height?: unknown };
    const url = typeof candidate.url === 'string' ? candidate.url.trim() : '';
    if (!url || (!/^\/(?:uploads|assets)\//.test(url) && !/^https?:\/\//i.test(url))) return [];
    return [{ url, ...(Number.isSafeInteger(candidate.width) && Number(candidate.width) > 0 ? { width: Number(candidate.width) } : {}), ...(Number.isSafeInteger(candidate.height) && Number(candidate.height) > 0 ? { height: Number(candidate.height) } : {}), alt: typeof candidate.alt === 'string' ? candidate.alt.trim().slice(0, 180) : '', caption: typeof candidate.caption === 'string' ? candidate.caption.trim().slice(0, 255) : '' }];
  });
};

const parseGallery = (value: string | null | undefined) => {
  if (!value) return [];
  try { return normalizeGallery(JSON.parse(value)); } catch { return []; }
};

export const cleanHtml = cleanArticleHtml;

export function cmsAvailable() {
  return Boolean(db);
}

function ensureInput(input: Partial<CmsPostInput>): CmsPostInput {
  const title = String(input.title || '').trim();
  const slug = String(input.slug || '').trim().toLowerCase();
  const excerpt = String(input.excerpt || '').trim();
  const category = String(input.category || '').trim();
  const status = input.status ?? 'draft';
  if (status !== 'draft' && status !== 'published') throw new Error('Status de publicação inválido.');
  if (!title || title.length > 120 || (status === 'published' && title.length < 10)) throw new Error(status === 'published' ? 'O título deve ter entre 10 e 120 caracteres.' : 'Informe um título de até 120 caracteres para o rascunho.');
  if (slug.length > 160 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('O slug deve ter até 160 caracteres e conter apenas letras minúsculas, números e hífens.');
  if (!postCategories.includes(category as typeof postCategories[number])) throw new Error('Categoria inválida.');
  if (excerpt.length > 250 || (status === 'published' && excerpt.length < 20)) throw new Error('O resumo deve ter entre 20 e 250 caracteres para publicar.');
  const bodyHtml = cleanHtml(String(input.bodyHtml || ''));
  if (status === 'published' && !hasArticleContent(bodyHtml)) throw new Error('Escreva o conteúdo da matéria antes de publicar.');
  const publishedAt = input.publishedAt || new Date().toISOString();
  if (!Number.isFinite(new Date(publishedAt).getTime())) throw new Error('Informe uma data de publicação válida.');
  return {
    title,
    slug,
    category,
    publishedAt,
    excerpt,
    author: String(input.author || 'Assessoria de Comunicação Grupo +B').trim(),
    bodyHtml,
    status,
    seoTitle: String(input.seoTitle || title).trim().slice(0, 60),
    seoDescription: String(input.seoDescription || excerpt).trim().slice(0, 160),
    imagePath: input.imagePath ? String(input.imagePath) : undefined,
    imageCardPath: input.imageCardPath ? String(input.imageCardPath) : undefined,
    imageAlt: String(input.imageAlt || title).trim(),
    imageCaption: String(input.imageCaption || '').trim(),
    gallery: normalizeGallery(input.gallery),
    noIndex: Boolean(input.noIndex),
  };
}

function toCmsPost(post: {
  id: string; slug: string; title: string; category: string; publishedAt: Date; excerpt: string; author: string;
  bodyHtml: string; status: string; seoTitle: string | null; seoDescription: string | null; imagePath: string | null; imageCardPath: string | null;
  imageAlt: string | null; imageCaption: string | null; galleryJson: string | null; noIndex: boolean; createdAt?: Date; updatedAt?: Date;
}): CmsPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    publishedAt: post.publishedAt.toISOString(),
    excerpt: post.excerpt,
    author: post.author,
    bodyHtml: post.bodyHtml,
    status: post.status === 'draft' ? 'draft' : 'published',
    seoTitle: post.seoTitle || post.title,
    seoDescription: post.seoDescription || post.excerpt,
    imagePath: post.imagePath || undefined,
    imageCardPath: post.imageCardPath || undefined,
    imageAlt: post.imageAlt || '',
    imageCaption: post.imageCaption || '',
    gallery: parseGallery(post.galleryJson),
    noIndex: post.noIndex,
    createdAt: post.createdAt?.toISOString(),
    updatedAt: post.updatedAt?.toISOString(),
  };
}

const postSelect = {
  id: true, slug: true, title: true, category: true, publishedAt: true, excerpt: true, author: true,
  bodyHtml: true, status: true, seoTitle: true, seoDescription: true, imagePath: true, imageCardPath: true, imageAlt: true,
  imageCaption: true, galleryJson: true, noIndex: true, createdAt: true, updatedAt: true,
} as const;

export async function listCmsPosts() {
  if (!db) return [];
  const posts = await db.post.findMany({ select: postSelect, orderBy: { publishedAt: 'desc' } });
  return posts.map(toCmsPost);
}

export async function getCmsPost(id: string) {
  if (!db) return null;
  const post = await db.post.findUnique({ where: { id }, select: postSelect });
  return post ? toCmsPost(post) : null;
}

export async function createCmsPost(raw: Partial<CmsPostInput>) {
  if (!db) throw new Error('Banco de dados não configurado. Defina DATABASE_URL.');
  const input = ensureInput(raw);
  const { gallery, ...data } = input;
  const post = await db.post.create({ data: { ...data, galleryJson: JSON.stringify(gallery) }, select: postSelect });
  return toCmsPost(post);
}

export async function updateCmsPost(id: string, raw: Partial<CmsPostInput>) {
  if (!db) throw new Error('Banco de dados não configurado. Defina DATABASE_URL.');
  const input = ensureInput(raw);
  const { gallery, ...data } = input;
  const post = await db.post.update({ where: { id }, data: { ...data, galleryJson: JSON.stringify(gallery) }, select: postSelect });
  return toCmsPost(post);
}

export async function updateCmsPostStatus(id: string, status: PostStatus) {
  if (!db) throw new Error('Banco de dados não configurado. Defina DATABASE_URL.');
  const current = await getCmsPost(id);
  if (!current) return null;
  if (status === 'published') validateCmsPost({ ...current, status });
  const post = await db.post.update({ where: { id }, data: { status }, select: postSelect });
  return toCmsPost(post);
}

export async function deleteCmsPost(id: string) {
  if (!db) throw new Error('Banco de dados não configurado. Defina DATABASE_URL.');
  await db.post.delete({ where: { id } });
}

export function validateCmsPost(raw: Partial<CmsPostInput>) {
  ensureInput(raw);
  return true;
}
