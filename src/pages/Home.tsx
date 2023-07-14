import { Button } from '@/components/ui/button';
import banner from '@/assets/images/banner.png';
import hero from '@/assets/images/hero.png';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import Products from './Products';

export default function Home() {
  return (
    <>
      <div className="mb-96">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10 mb-10">
            RECENTLY ADDED
          </h1>
          <Products/>
          <Button className="mt-10" asChild>
            <Link to="/books">Browse All Books</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
