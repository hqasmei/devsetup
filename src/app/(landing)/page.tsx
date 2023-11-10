import HeroSection from '@/components/hero-section';
import Navbar from '@/components/nav/navbar';

const Home = async () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Home;
