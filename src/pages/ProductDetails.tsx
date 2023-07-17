// import ProductReview from '@/components/ProductReview';
import {
  useSingleProductQuery,
  useDeleteProductMutation,
  useGetRecentlyAddedProductsQuery,
} from '@/redux/features/products/productApi';
import { Link, useParams } from 'react-router-dom';
import { HiHeart, HiPencilAlt, HiTrash } from 'react-icons/hi';
import ProductReview from '@/components/ProductReview';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import ReactLoading from 'react-loading';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { addToWishlist } from '@/redux/features/wishlist/wishlistSlice';
import { IProduct } from '@/types/globalTypes';

export default function ProductDetails() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: book, isLoading } = useSingleProductQuery(id);
  const [deleteProduct] = useDeleteProductMutation();

  const bookDetails = book?.data;

  const { refetch } = useGetRecentlyAddedProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(id);
      toast({
        description: 'Book deleted successfully',
      });
      await refetch();
      navigate(`/`);
    } catch (error) {
      toast({
        description: 'Failed to delete book',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type="spin" color="#000" />
      </div>
    );
  }

  // Check if the user and book.user are the same
  const isCurrentUserBookOwner =
    user && user.email && bookDetails && user.email === bookDetails.user;

  const handleAddProduct = (product: IProduct) => {
    dispatch(addToWishlist(product));
    toast({
      description: 'Added to Wishlist',
    });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto items-center justify-center lg:justify-between border-b border-gray-300 p-5 mt-10">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={bookDetails?.image} alt="" className="max-w-full h-auto" />
        </div>
        <div className="w-full lg:w-1/2 space-y-3 text-center lg:text-left">
          <div className="flex justify-center lg:justify-between items-center">
            <h1 className="text-3xl font-semibold">{bookDetails?.title}</h1>
          </div>
          <p className="text-md">
            <span className="font-semibold">Author:</span> {bookDetails?.author}
          </p>
          <p className="text-md">
            <span className="font-semibold">Genre:</span> {bookDetails?.genre}
          </p>
          <p className="text-md">
            <span className="font-semibold">Publication Year:</span>{' '}
            {bookDetails?.publicationYear}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start">
            <button
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleAddProduct(bookDetails)}
            >
              <HiHeart />
            </button>
            {isCurrentUserBookOwner && (
              <>
                <Link to={`/edit-book/${bookDetails?._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                    <HiPencilAlt />
                  </button>
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={handleDeleteProduct}
                >
                  <HiTrash />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
