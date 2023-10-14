import UserNavbar from '@/components/user-navbar';

export const metadata = {
  title: 'devsetup | admin',
  description: '',
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center w-full">
      <UserNavbar /> 
      {children}
    </div>
  );
};

export default AdminLayout;
