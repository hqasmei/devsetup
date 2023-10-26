'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

const useNavigation = () => {
  const pathname = usePathname();
  const [isSetupActive, setIsSetupActive] = useState(false);
  const [isProductsActive, setIsProductsActive] = useState(false);
  const [isAnalyticsActive, setIsAnalyticsActive] = useState(false);

  useEffect(() => {
    setIsSetupActive(false);
    setIsProductsActive(false);
    setIsAnalyticsActive(false);

    switch (pathname) {
      case '/admin':
        setIsSetupActive(true);
        break;
      case '/admin/products':
        setIsProductsActive(true);
        break;
      case '/admin/analytics':
        setIsAnalyticsActive(true);
        break;
      default:
        break;
    }
  }, [pathname]);

  return {
    isSetupActive,
    isProductsActive,
    isAnalyticsActive,
  };
};

export default useNavigation;
