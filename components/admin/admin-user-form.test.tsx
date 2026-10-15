/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AdminUserForm } from './admin-user-form';

vi.mock('next/link', () => ({ default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => <a href={href} {...props}>{children}</a> }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));
vi.mock('lucide-react', async (importOriginal) => {
  const icons = await importOriginal<typeof import('lucide-react')>();
  return {
    ...icons,
    Eye: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} data-icon="Eye" />,
    EyeOff: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} data-icon="EyeOff" />,
  };
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('AdminUserForm permission switches', () => {
  it('shows the custom permission states and moves each switch handle within its track', () => {
    render(<AdminUserForm currentUserId="admin-1" />);

    const posts = screen.getByRole('switch', { name: 'Permissão: Publicações' });
    const settings = screen.getByRole('switch', { name: 'Permissão: Configurações' });
    const access = screen.getByRole('switch', { name: 'Permissão: Gestão de Acessos' });
    const postsHandle = posts.querySelector('span');
    const settingsHandle = settings.querySelector('span');

    expect(posts.getAttribute('aria-checked')).toBe('true');
    expect(settings.getAttribute('aria-checked')).toBe('false');
    expect(access.getAttribute('aria-checked')).toBe('false');
    expect(postsHandle?.className).toContain('left-1');
    expect(postsHandle?.className).toContain('translate-x-5');
    expect(settingsHandle?.className).toContain('translate-x-0');

    fireEvent.click(settings);

    expect(settings.getAttribute('aria-checked')).toBe('true');
    expect(settingsHandle?.className).toContain('translate-x-5');
  });

  it('shows eye icons that match whether each password is currently visible', () => {
    render(<AdminUserForm currentUserId="admin-1" />);

    const showPasswordButton = screen.getByRole('button', { name: 'Mostrar senha' });
    const showConfirmButton = screen.getByRole('button', { name: 'Mostrar confirmação de senha' });

    expect(screen.getByLabelText('Senha').getAttribute('type')).toBe('password');
    expect(showPasswordButton.querySelector('svg')?.getAttribute('data-icon')).toBe('EyeOff');
    expect(showConfirmButton.querySelector('svg')?.getAttribute('data-icon')).toBe('EyeOff');

    fireEvent.click(showPasswordButton);
    fireEvent.click(showConfirmButton);

    expect(screen.getByLabelText('Senha').getAttribute('type')).toBe('text');
    expect(screen.getByLabelText('Confirmar senha').getAttribute('type')).toBe('text');
    expect(screen.getByRole('button', { name: 'Ocultar senha' }).querySelector('svg')?.getAttribute('data-icon')).toBe('Eye');
    expect(screen.getByRole('button', { name: 'Ocultar confirmação de senha' }).querySelector('svg')?.getAttribute('data-icon')).toBe('Eye');
  });

  it('describes a password reset without promising a forced password change', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        user: {
          id: 'editor-1', name: 'Ana Silva', email: 'ana@example.invalid', role: 'EDITOR',
          permissions: { posts: true, settings: false, access: false }, isActive: true, mustChangePassword: true,
        },
        history: [{
          id: 'event-1', action: 'PASSWORD_RESET', details: { mustChangePassword: false },
          createdAt: '2026-10-15T12:00:00.000Z', actor: { name: 'Admin', email: 'admin@example.invalid' },
        }],
      }),
    }));

    render(<AdminUserForm userId="editor-1" currentUserId="admin-1" />);

    expect(await screen.findByText(/A senha foi redefinida e as sessões anteriores foram encerradas/)).toBeTruthy();
    expect(screen.queryByText('Uma senha temporária foi definida. O usuário precisará escolher uma nova senha no próximo acesso.')).toBeNull();
  });
});
