import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IProduct } from '@/types/globalTypes';
import { useAppSelector } from '@/redux/hook';
import {
  useEditProductMutation,
  useSingleProductQuery,
} from '@/redux/features/products/productApi';
import { toast } from '@/components/ui/use-toast';

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('bookId', id);
  const { user } = useAppSelector((state) => state.user);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IProduct>();

  const { data: product } = useSingleProductQuery(id);
  console.log('singleBookData', product.data);
  const [updateProduct, { isLoading }] = useEditProductMutation();

  useEffect(() => {
    if (product) {
      setValue('title', product.data.title);
      setValue('author', product.data.author);
      setValue('genre', product.data.genre);
      setValue('publicationYear', Number(product.data.publicationYear));
      setValue('image', product.data.image);
    }
  }, [product, setValue]);

  const onSubmit = async (data: IProduct) => {
    const newData = {
      ...data,
      publicationYear: Number(data.publicationYear),
      user: user ? user.email : undefined,
    };
    console.log('data: Updated Data', JSON.stringify(newData));

    try {
      await updateProduct({ id, data: newData });
      toast({
        description: 'Book updated successfully',
      });
      navigate(`/book/${id}`);
    } catch (error) {
      toast({
        description: 'Failed to update book',
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 text-primary">
      <div className="max-w-3xl w-full">
        {/* Book Information */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10 mb-10">
            EDIT BOOK
          </h1>
        </div>
        <div className="border border-gray-300 rounded-md p-10 mb-10">
          {product ? (
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
                    <span className="text-red-500">
                      {errors.author.message}
                    </span>
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
                  {isLoading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
