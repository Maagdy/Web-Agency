import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Text } from "../../../components/common";
import { cardIconArray } from "../../../common/constants/cardsContent";
import { Link } from "react-router-dom";
import type { ProductCardProps } from "../../../components/types/types";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addToCart,
  removeFromCart,
  syncCartItem,
} from "../../../redux/slices/ProductSlices/cartSlices/cartSlice";
import type { CartItem } from "../../../redux/slices/ProductSlices/cartSlices/types";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  price,
  title,
  category,
  imgSrc,
  path,
  isRelated = false,
}) => {
  const dispatch = useAppDispatch();

  const cartStateHandler = async (cartItem: CartItem) => {
    dispatch(addToCart(cartItem));
    await dispatch(syncCartItem({ item: cartItem })).unwrap();
  };

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    product: CartItem
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await cartStateHandler(product);
      console.log("✅ Added to cart");
    } catch (error) {
      dispatch(removeFromCart(product.id));
      console.error("❌ Failed:", error);
    }
  };
  return (
    <Link
      to={path}
      className="group cursor-default relative shadow-lg bg-white *:z-10"
    >
      <div className="w-auto h-auto text-sm sm:text-base lg:text-lg p-2 font-bold rounded-sm text-[var(--mainColor)] text-center absolute bg-cyan-400 -top-2 -right-2 sm:-top-3 sm:-right-3">
        ${price?.toFixed(2)}
      </div>

      {!isRelated && (
        <Button
          variant="secondary"
          onClick={(e) =>
            handleAddToCart(e, {
              id: id,
              title: title,
              price: price,
              quantity: 1,
              image: imgSrc,
            })
          }
          className="absolute top-0 left-0 m-2 sm:m-3 md:m-5 rounded-sm !text-[var(--mainColor)] !border-[var(--mainColor)] hover:!bg-[var(--mainColor)] hover:!text-white opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 !text-xs sm:!text-sm md:!text-base !px-2 sm:!px-3 md:!px-4 !py-1 sm:!py-1.5 md:!py-2"
          iconLeft={<ShoppingCartIcon className="!text-sm sm:!text-base" />}
        >
          <span className="hidden sm:inline">Add To Cart</span>
          <span className="inline sm:hidden">Add</span>
        </Button>
      )}

      <div className="group/image">
        <img
          src={imgSrc}
          alt="test"
          loading="lazy"
          className={`w-full ${
            isRelated ? "p-4 sm:p-6 md:p-8" : "p-8 sm:p-10 md:p-12"
          } h-auto object-cover -z-1 transition-all duration-500 group-hover/image:filter group-hover/image:hue-rotate-90`}
        />

        {!isRelated && (
          <div className="absolute opacity-0 group-hover:opacity-100 flex flex-col bg-[var(--mainColor)] gap-2 md:gap-3 rounded-sm top-[35%] sm:top-[40%] right-2 sm:right-3 transition-all duration-300">
            {cardIconArray.map((item, index) => (
              <div key={index}>
                <button
                  className="relative group/button p-1.5 sm:p-2 hover:bg-cyan-400 cursor-pointer"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="text-base sm:text-lg md:text-xl">
                    {item.icon}
                  </span>
                  <span className="hidden sm:block absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 translate-x-2 group-hover/button:opacity-100 group-hover/button:translate-x-0 bg-cyan-400 text-white px-2 sm:px-3 py-1 rounded-sm whitespace-nowrap transition-all duration-300 pointer-events-none text-xs sm:text-sm">
                    {item.title}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <section
        className={`bg-[var(--mainColor)] ${
          isRelated ? "p-2 sm:p-2.5" : "p-3 sm:p-4 md:p-5"
        } mx-3 sm:mx-4 md:mx-6 rounded-md mb-3 sm:mb-4 md:mb-5`}
      >
        <Text
          variant="lead"
          className={`text-white ${
            isRelated
              ? "!text-xs sm:!text-sm md:!text-base"
              : "!text-sm sm:!text-base md:!text-lg lg:!text-xl"
          }`}
        >
          {title.length > 20 ? title.slice(0, 20) + "..." : title}
        </Text>
        <Text
          variant="muted"
          className={`text-white ${
            isRelated ? "!text-[10px] sm:!text-xs" : "!text-xs sm:!text-sm"
          } mt-0.5 sm:mt-1 opacity-75`}
        >
          {category}
        </Text>
      </section>
    </Link>
  );
};

export default ProductCard;
