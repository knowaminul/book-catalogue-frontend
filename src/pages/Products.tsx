import ProductCard from '@/components/ProductCard';
import { Slider } from '@/components/ui/slider';
import { useGetProductsQuery } from '@/redux/features/products/productApi';
import {
  setGenre,
  setPublicationYear,
} from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

export default function Products() {
  const { data, isLoading } = useGetProductsQuery(undefined);

  const { genre, publicationYear } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  // Use local state to store the available genres
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.data) {
      const uniqueGenres = [
        ...new Set(data.data.map((item: IProduct) => item.genre)),
      ];
      setGenres(uniqueGenres as string[]);
    }
  }, [data]);

  const handleGenreChange = (value: string) => {
    dispatch(setGenre(value));
  };

  const handlePublicationYearChange = (value: number[]) => {
    dispatch(setPublicationYear(value[0]));
  };

  let productsData;

  if (!genre || !publicationYear) {
    productsData = data?.data;
  } else if (genre !== 'All') {
    productsData = data?.data?.filter(
      (item: { genre: string }) => item.genre === genre
    );
    console.log('productsDataByGenre', productsData);
  } else if (publicationYear > 0) {
    productsData = data?.data?.filter(
      (item: { publicationYear: number }) =>
        item.publicationYear < publicationYear
    );
  } else {
    productsData = data?.data;
    console.log('productsData', JSON.stringify(productsData));
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type="spin" color="#000" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div className="space-y-3">
          <h1 className="text-2xl uppercase">Genre</h1>
          <select
            className="max-w-xl w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => handleGenreChange(e.target.value)}
            value={genre}
          >
            <option value="All">All</option>
            {genres.map((genreOption) => (
              <option key={genreOption} value={genreOption}>
                {genreOption}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Publication Year</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[2023]}
              max={2023}
              min={1455}
              step={1}
              onValueChange={(value) => handlePublicationYearChange(value)}
            />
          </div>
          <div>From 1455$ To {publicationYear}$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product: IProduct) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
