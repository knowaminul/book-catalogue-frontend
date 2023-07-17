import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import RecentlyAddedProducts from './RecentlyAddedProducts';
import { useGetSearchResultQuery } from '@/redux/features/products/productApi';
import ReactLoading from 'react-loading';
import ProductCard from '@/components/ProductCard';
import { IProduct } from '@/types/globalTypes';

export default function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('searchTerm');

  console.log('keyword>>', keyword);
  const {
    data: searchResult,
    isLoading: isSearchLoading,
  } = useGetSearchResultQuery({
    keyword,
  });
  console.log('getSearched Data', JSON.stringify(searchResult?.data));

  return (
    <>
      {!keyword ? (
        <>
          <div className="mb-96">
            <div className="flex flex-col items-center justify-center lg:justify-start">
              <h1 className="text-5xl font-black text-primary uppercase mt-10 mb-5">
                RECENTLY ADDED
              </h1>
              <RecentlyAddedProducts />
              <Button className="mt-1" asChild>
                <Link to="/books">Browse All Books</Link>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {searchResult && !isSearchLoading ? (
            <div className="mb-96">
              <div className="flex flex-col items-center justify-center lg:justify-start">
                <h5 className="text-3xl font-black text-primary mt-10 mb-5">
                  Search Result for "{keyword}"
                </h5>
                <div className="grid grid-cols-12 max-w-7xl mx-auto relative">
                  <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-10 sm:justify-center">
                    {searchResult.data?.map((product: IProduct) => (
                      <div
                        key={product._id}
                        className="mx-2 sm:mx-4 md:mx-6 lg:mx-0 flex justify-center"
                      >
                        <div className="w-full p-4">
                          <ProductCard product={product} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>{' '}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <ReactLoading type="spin" color="#000" />
            </div>
          )}
        </>
      )}
      <Footer />
    </>
  );
}
