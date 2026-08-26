import { redirect } from 'next/navigation';
import { AdminShell } from '../../../components/admin/admin-shell';
import { isAdminAuthenticated } from '../../../lib/cms-auth';

export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');

  return <AdminShell>{children}</AdminShell>;
}
