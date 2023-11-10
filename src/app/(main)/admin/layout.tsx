import PreviewButton from '@/components/preview-button';
import UserNavbar from '@/components/server/user-navbar';

export const metadata = {
  title: 'Admin | DevSetup',
  description: '',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center w-full">
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-background"></div>
      </div>
      <UserNavbar />
      <div className="w-full pt-[120px] md:pt-[70px]">{children}</div>
      <PreviewButton />
    </div>
  );
}
