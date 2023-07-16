import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IProduct } from '@/types/globalTypes';
import { useAppSelector } from '@/redux/hook';
import {
  useCreateProductMutation,
  useGetRecentlyAddedProductsQuery,
} from '@/redux/features/products/productApi';
import { toast } from '@/components/ui/use-toast';

export default function AddBook() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IProduct>();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const { refetch } = useGetRecentlyAddedProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const onSubmit = async (data: IProduct) => {
    console.log('data: IProduct', data);
    const newData = {
      ...data,
      publicationYear: Number(data.publicationYear),
      user: user ? user.email : undefined,
    };
    createProduct(newData);

    try {
      await createProduct({ data: newData });
      toast({
        description: 'Book created successfully',
      });
      await refetch();
      navigate(`/`);
    } catch (error) {
      toast({
        description: 'Failed to create book',
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 text-primary">
      <div className="max-w-3xl w-full">
        {/* Book Information */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10 mb-10">
            ADD NEW BOOK
          </h1>
        </div>
        <div className="border border-gray-300 rounded-md p-10 mb-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  className="mt-2"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <span className="text-red-500">{errors.title.message}</span>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="author">Author</Label>
                <Input
                  type="text"
                  id="author"
                  className="mt-2"
                  {...register('author', { required: 'Author is required' })}
                />
                {errors.author && (
                  <span className="text-red-500">{errors.author.message}</span>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="genre">Genre</Label>
                <Input
                  type="text"
                  id="genre"
                  className="mt-2"
                  {...register('genre', { required: 'Genre is required' })}
                />
                {errors.genre && (
                  <span className="text-red-500">{errors.genre.message}</span>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="publicationYear">Publication Year</Label>
                <Input
                  type="number"
                  id="publicationYear"
                  className="mt-2"
                  {...register('publicationYear', {
                    required: 'Publication Year is required',
                  })}
                />
                {errors.publicationYear && (
                  <span className="text-red-500">
                    {errors.publicationYear.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="image">Image</Label>
                <Input
                  type="text"
                  id="image"
                  className="mt-2"
                  {...register('image', { required: 'Image is required' })}
                />
                {errors.image && (
                  <span className="text-red-500">{errors.image.message}</span>
                )}
              </div>
            </div>
            <div className="flex mt-5">
              <button
                type="submit"
                className="bg-primary text-white w-full py-3 rounded-md text-lg font-medium"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? 'Adding...' : 'Add'} {/* Update button text */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
