import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { HiOutlineHeart, HiOutlineTrash } from 'react-icons/hi';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { removeFromWishlist } from '@/redux/features/wishlist/wishlistSlice';

export default function Wishlist() {
  const { products } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();
  const wishlistCount = products.length;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" className="relative">
          <HiOutlineHeart size="25" />
          {wishlistCount > 0 && (
            <span className="absolute bottom-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Wishlist</SheetTitle>
        </SheetHeader>
        <div className="space-y-5">
          {products.map((product) => (
            <div
              className="border h-44 p-5 flex justify-between rounded-md"
              key={product.title}
            >
              <div className="border-r pr-5 shrink-0">
                <img src={product?.image} alt="" className="h-full" />
              </div>
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-2xl self-center">{product?.title}</h1>
                <p>{product?.author}</p>
              </div>
              <div className="border-l pl-5 flex flex-col items-center justify-center"> {/* Added 'items-center' class */}
                <Button
                  onClick={() => dispatch(removeFromWishlist(product))}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                >
                  <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
