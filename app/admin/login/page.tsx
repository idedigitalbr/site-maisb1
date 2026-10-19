import { AdminLogin } from '../../../components/admin/admin-login';
import { redirect } from 'next/navigation';
import { getAdminHomeHref } from '../../../lib/admin-access';
import { getCurrentAdmin, getAdminPermissions } from '../../../lib/cms-auth';

export default async function AdminLoginPage() {
  const user = await getCurrentAdmin();
  if (user) redirect(getAdminHomeHref(getAdminPermissions(user)));
  return <AdminLogin />;
}

