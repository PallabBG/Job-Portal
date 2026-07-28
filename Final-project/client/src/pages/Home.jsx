
import Hero from "../components/home/Hero"
import Stats from '../components/home/Stats';
import Categories from '../components/home/Categories';
import AIFeatures from '../components/home/AIFeatures';
import FeaturedJobs from '../components/home/FeaturedJobs';
import Companies from '../components/home/Companies';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-blue-500/30">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Statistics Section */}
      <Stats />

      {/* 3. Popular Categories */}
      <Categories />

      {/* 4. AI Features */}
      <AIFeatures />

      {/* 5. Featured Jobs */}
      <FeaturedJobs />

      {/* 6. Top Companies */}
      <Companies />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. CTA Section */}
      <CTA />

    </div>
  );
};

export default Home;
