import ProductCard from '@/components/ProductCard';
import { useGetRecentlyAddedProductsQuery } from '@/redux/features/products/productApi';
import { IProduct } from '@/types/globalTypes';

export default function RecentlyAddedProducts() {
  const { data, isLoading, error } = useGetRecentlyAddedProductsQuery(undefined);

  const productsData = data?.data;

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative">
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-20 sm:justify-center">
        {productsData?.map((product: IProduct) => (
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
    </div>
  );
}
