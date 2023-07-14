import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSingleProductQuery } from '@/redux/features/products/productApi';
import { useParams } from 'react-router-dom';

export default function EditBook() {
  const { id } = useParams();

  const { data: book, isLoading, error } = useSingleProductQuery(id);

  const bookDetails = book?.data;
  console.log('bookDetails:', bookDetails);

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
        <div className="flex flex-col space-y-5">
            <div className="flex flex-col">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" className="mt-2" />
            </div>
            <div className="flex flex-col">
            <Label htmlFor="author">Author</Label>
            <Input type="text" id="author" className="mt-2" />
            </div>
            <div className="flex flex-col">
            <Label htmlFor="genre">Genre</Label>
            <Input type="text" id="genre" className="mt-2" />
            </div>
            <div className="flex flex-col">
            <Label htmlFor="publicationDate">Publication Date</Label>
            <Input type="text" id="publicationDate" className="mt-2" />
            </div>
            <div className="flex flex-col">
            <Label htmlFor="image">Image</Label>
            <Input type="text" id="image" className="mt-2" />
            </div>
        </div>
        <div className="flex mt-5">
          <button className="bg-primary text-white w-full py-3 rounded-md text-lg font-medium">
            Update
          </button>
        </div>
        </div>
    </div>
    </div>

  );
}
