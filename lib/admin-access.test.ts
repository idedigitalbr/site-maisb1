import { describe, expect, it } from 'vitest';
import {
  canGrantPermissions,
  getRolePermissions,
  getAdminHomeHref,
  hasFullAdminAccess,
  isSecurePassword,
  resolveAdminPermissions,
  type AdminPermissions,
} from './admin-access';

describe('admin access policy', () => {
  it('gives editors access only to publications', () => {
    expect(getRolePermissions('EDITOR')).toEqual({ posts: true, settings: false, access: false, analytics: false });
  });

  it('gives administrators all platform permissions', () => {
    expect(getRolePermissions('ADMINISTRATOR')).toEqual({ posts: true, settings: true, access: true, analytics: true });
  });

  it('applies editor and administrator presets even if a client submits different switches', () => {
    expect(resolveAdminPermissions('EDITOR', { posts: true, settings: true, access: true, analytics: true })).toEqual({ posts: true, settings: false, access: false, analytics: false });
    expect(resolveAdminPermissions('ADMINISTRATOR', { posts: false, settings: false, access: false, analytics: false })).toEqual({ posts: true, settings: true, access: true, analytics: true });
  });

  it('requires at least one explicit permission for a custom account', () => {
    expect(resolveAdminPermissions('CUSTOM', { posts: true, settings: false, access: true, analytics: true })).toEqual({ posts: true, settings: false, access: true, analytics: true });
    expect(() => resolveAdminPermissions('CUSTOM', { posts: false, settings: false, access: false, analytics: false })).toThrow();
    expect(() => resolveAdminPermissions('CUSTOM', { posts: true, settings: 'yes', access: false })).toThrow();
  });

  it('does not let an account manager grant permissions it does not have', () => {
    const actor: AdminPermissions = { posts: true, settings: false, access: true, analytics: false };
    expect(canGrantPermissions(actor, { posts: true, settings: true, access: false, analytics: false })).toBe(false);
    expect(canGrantPermissions(actor, { posts: true, settings: false, access: true, analytics: false })).toBe(true);
  });

  it('recognizes only an active account with all permissions as a full administrator', () => {
    expect(hasFullAdminAccess({ posts: true, settings: true, access: true, analytics: true }, true)).toBe(true);
    expect(hasFullAdminAccess({ posts: true, settings: true, access: true, analytics: true }, false)).toBe(false);
    expect(hasFullAdminAccess({ posts: true, settings: false, access: true, analytics: true }, true)).toBe(false);
  });

  it('sends each account to the first area it is allowed to open', () => {
    expect(getAdminHomeHref({ posts: false, settings: true, access: true, analytics: false })).toBe('/admin/settings');
    expect(getAdminHomeHref({ posts: false, settings: false, access: true, analytics: false })).toBe('/admin/access');
    expect(getAdminHomeHref({ posts: true, settings: false, access: false, analytics: true })).toBe('/admin/posts');
    expect(getAdminHomeHref({ posts: false, settings: false, access: false, analytics: true })).toBe('/admin/analytics');
  });

  it('requires exactly eight characters without requiring character categories', () => {
    expect(isSecurePassword('12345678')).toBe(true);
    expect(isSecurePassword('abcdefgh')).toBe(true);
    expect(isSecurePassword('!!!!!!!!')).toBe(true);
    expect(isSecurePassword('1234567')).toBe(false);
    expect(isSecurePassword('123456789')).toBe(false);
  });
});
