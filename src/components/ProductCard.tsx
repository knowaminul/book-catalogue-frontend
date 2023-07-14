import { IProduct } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div>
    <div className="rounded-2xl flex flex-col items-center justify-center p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
      <Link to={`/book/${product._id}`} className="w-full flex flex-col items-center">
        <div className="w-[130px] h-[186px]">
          <img src={product?.image} alt="product" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-semibold text-center mt-2">{product?.title}</h1>
      
      <p className="text-center">Author: {product?.author}</p>
      <p className="text-sm text-center">Genre: {product?.genre}</p>
      <p className="text-sm text-center">Publication Date: {product?.publicationDate}</p>
      </Link>
      {/* <Button variant="default" onClick={() => handleAddProduct(product)}>
        Add to cart
      </Button> */}
    </div>
    </div>
  );
}
