import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HiOutlineSearch } from 'react-icons/hi';

export default function SearchBox() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<{ keyword: string }>();

  const onSubmit = (data: { keyword: string }) => {
    const { keyword } = data;
    console.log('keywordSearch', keyword);
    if (keyword) {
      navigate(`/?searchTerm=${keyword.trim()}`);
    } else {
      navigate('/books');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start"
    >
      <div className="flex flex-col">
        <div className="flex">
          <Input
            type="text"
            id="keyword"
            className="mr-2"
            {...register('keyword')}
          />
          <Button type="submit" variant="ghost">
            <HiOutlineSearch size="25" />
          </Button>
        </div>
      </div>
    </form>
  );
}
