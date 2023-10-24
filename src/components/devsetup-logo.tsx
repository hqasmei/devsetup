import React from 'react';

import Image from 'next/image';

import Logo from '../../public/logo.png';

const DevSetupLogo = () => {
  return <Image priority src={Logo} alt="devsetup logo" width={30} height={30} />;
};

export default DevSetupLogo;
