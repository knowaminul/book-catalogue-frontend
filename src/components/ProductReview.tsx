import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import {
  useGetReviewQuery,
  usePostReviewMutation,
} from '@/redux/features/products/productApi';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState<string>('');

  const { data, refetch } = useGetReviewQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [postReview] = usePostReviewMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);

    try {
      await postReview({
        id: id,
        data: { review: inputValue },
      });
      setInputValue('');
      toast({
        description: 'Review added successfully',
      });
      await refetch();
      navigate(`/book/${id}`);
    } catch (error) {
      toast({
        description: 'Failed to create review',
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      {user.email !== null && (
        <>
          <h5 className="text-xl font-black text-primary mt-10 mb-5">
            Write a review
          </h5>
          <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
            <Textarea
              className="min-h-[30px]"
              onChange={handleChange}
              value={inputValue}
            />
            <Button
              type="submit"
              className="rounded-full h-10 w-10 p-2 text-[25px]"
            >
              <FiSend />
            </Button>
          </form>
        </>
      )}
      <div className="mt-10">
        {data?.data?.reviews == undefined ||
        data?.data?.reviews.length === 0 ? (
          <h5 className="text-xl font-black text-primary mt-10 mb-5">
            No Reviews
          </h5>
        ) : (
          <h5 className="text-xl font-black text-primary mt-10 mb-5">
            Reviews ({data?.data?.reviews.length})
          </h5>
        )}
        {data?.data?.reviews?.map((review: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
