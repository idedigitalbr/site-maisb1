import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const CMS_COOKIE = 'cms_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function secret() {
  return process.env.CMS_SESSION_SECRET || process.env.REVALIDATE_SECRET || '';
}

function sign(value: string) {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}

export function isCmsConfigured() {
  return Boolean(process.env.CMS_ADMIN_PASSWORD && secret());
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.CMS_ADMIN_PASSWORD || '';
  if (!expected || !password) return false;
  const received = Buffer.from(password);
  const stored = Buffer.from(expected);
  return received.length === stored.length && timingSafeEqual(received, stored);
}

export function createCmsToken() {
  const payload = `${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidCmsToken(token?: string) {
  if (!token || !secret()) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || Date.now() - Number(payload) > MAX_AGE_SECONDS * 1000) return false;
  const expected = sign(payload);
  const received = Buffer.from(signature);
  const stored = Buffer.from(expected);
  return received.length === stored.length && timingSafeEqual(received, stored);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return isValidCmsToken(cookieStore.get(CMS_COOKIE)?.value);
}
