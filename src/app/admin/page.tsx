import React from 'react';

import { cookies } from 'next/headers';

import AdminSection from '@/components/admin-section';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';



const AdminPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: setups } = await supabase
    .from('setups')
    .select('*')
    .eq('user_id', user?.id);

  return (
    <div className="flex flex-col w-full space-y-4">
      <AdminSection serverSetups={setups} />
    </div>
  );
};

export default AdminPage;
