// import ProductReview from '@/components/ProductReview';
import { useSingleProductQuery } from '@/redux/features/products/productApi';
import { Link, useParams } from 'react-router-dom';
import { HiHeart, HiPencilAlt, HiTrash } from 'react-icons/hi';

export default function ProductDetails() {
  const { id } = useParams();

  const { data: book, isLoading, error } = useSingleProductQuery(id);

  const bookDetails = book?.data;
  console.log('bookDetails:', bookDetails);

  return (
    <>
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto items-center justify-center lg:justify-between border-b border-gray-300 mt-10">
      <div className="w-full lg:w-1/2 flex justify-center">
        <img src={bookDetails?.image} alt="" className="max-w-full h-auto" />
      </div>
      <div className="w-full lg:w-1/2 space-y-3 text-center lg:text-left">
        <div className="flex justify-center lg:justify-between items-center">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
        </div>
        <p className="text-md"><span className="font-semibold">Author:</span> {bookDetails?.author}</p>
        <p className="text-md"><span className="font-semibold">Genre:</span> {bookDetails?.genre}</p>
        <p className="text-md"><span className="font-semibold">Publication Date:</span> {bookDetails?.publicationDate}</p>
        <div className="flex flex-wrap justify-center lg:justify-start">
          <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
            <HiHeart />
          </button>
          <Link to={`/editBook/${bookDetails?._id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            <HiPencilAlt />
          </button>
          </Link>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
            <HiTrash />
          </button>
        </div>
      </div>
    </div>
    {/* <ProductReview id={id!} /> */}
    </>
  );
}