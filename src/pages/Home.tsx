import { Button } from '@/components/ui/button';
import banner from '@/assets/images/banner.png';
import hero from '@/assets/images/hero.png';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import RecentlyAddedProducts from './RecentlyAddedProducts';

export default function Home() {
  return (
    <>
      <div className="mb-96">
        <div className="flex flex-col items-center justify-center lg:justify-start">
          <h1 className="text-5xl font-black text-primary uppercase mt-10 mb-5">
            RECENTLY ADDED
          </h1>
          <RecentlyAddedProducts/>
          <Button className="mt-5" asChild>
            <Link to="/books">Browse All Books</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
