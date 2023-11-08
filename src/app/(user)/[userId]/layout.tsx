export const metadata = {
  title: 'TBD | DevSetup',
  description: '',
};

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center w-full">
      {children}
    </div>
  );
};

export default UserLayout;
