import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "../../../index.css";

import { useParams } from "react-router-dom";
import { useProduct } from "../../../hooks/ShopPageHooks/useProduct";
import { Loading } from "../../../components/common/loading";
import { Rating } from "@mui/material";
import { Button, Text } from "../../../components/common";
import { cardIconArray } from "../../../common/constants/cardsContent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { CheckCircleOutline } from "@mui/icons-material";
import { paymentsCards } from "../../../common/assets/images";
import SocialMediaBar from "../../../components/UI/SocialMediaBar";
import { allSocialMediaIcons } from "../../../common/constants/socialIcons";
import { deliveryInfo } from "../../../common/constants/productDetails";
import { ProductDetailsInfo } from "./ProductDetailsInfo";
import RelatedProducts from "../components/RelatedProducts";

function ProductDetailsPage() {
  const { productName } = useParams<{ productName?: string }>();
  const { product, error, loading } = useProduct(productName ?? "");
  const [activeImageState, setActiveImageState] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Use the selected image OR fall back to product main image
  const activeImage = activeImageState || product?.img_src || "";

  // Create array of all images
  const allImages = product
    ? [
        product.img_src,
        ...(product.sub_images || []).filter((img) => img !== product.img_src),
      ]
    : [];

  // Handle manual thumbnail click
  const handleThumbnailClick = (img: string) => {
    setActiveImageState(img);
  };

  if (loading) {
    return (
      <Loading
        className="force-main-color w-full items-center !bg-transparent"
        text="Loading Product..."
      />
    );
  }

  if (error) {
    return <p className="p-10 text-center text-red-500">Error: {error}</p>;
  }

  if (!product) {
    return <p className="p-10 text-center text-gray-500">Product not found.</p>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full items-start py-6 sm:py-10 px-4 sm:px-6 lg:px-16 xl:px-20">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 p-3 sm:p-6 lg:p-12 lg:sticky lg:top-4">
          <div className="bg-white border group border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-contain rounded-2xl p-4 transition-opacity duration-500"
            />
          </div>

          {/* Thumbnail Swiper */}
          <Swiper
            modules={[Navigation]}
            navigation={false}
            loop={allImages.length > 3}
            slidesPerView={3}
            spaceBetween={12}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 12 },
              768: { slidesPerView: 4, spaceBetween: 16 },
              1024: { slidesPerView: 5, spaceBetween: 16 },
            }}
            className="mySwiper mt-4 sm:mt-6"
            style={{ padding: "10px 20px" }}
          >
            {allImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => handleThumbnailClick(img)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 transform hover:scale-105 relative ${
                    activeImage === img
                      ? "border-[var(--mainColor)] shadow-md"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-16 sm:h-20 lg:h-24 object-contain p-1 bg-white"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col w-full lg:w-1/2 p-4 sm:p-6 lg:p-10 gap-3 sm:gap-4">
          {/* Rating */}
          <section className="flex flex-wrap gap-2 items-center">
            <Rating value={product.rating} readOnly precision={0.1} />
            <span className="text-xs sm:text-sm text-gray-500">
              Num of Reviews
            </span>
          </section>

          {/* Price */}
          <Text
            variant="lead"
            className="my-2 sm:my-4 text-[var(--mainColor)] !text-2xl sm:!text-3xl lg:!text-4xl"
          >
            ${product.price}
          </Text>

          {/* Description */}
          <div className="text-sm sm:text-base">
            {product.long_description
              .replace(/\\n/g, "\n")
              .split("\n")
              .filter((para) => para.trim() !== "")
              .map((para, index) => (
                <Text key={index} variant="body" className="mb-3 sm:mb-4">
                  {para}
                </Text>
              ))}
          </div>

          {/* Quantity Selector */}
          <section className="bg-[var(--mainColor)] text-white rounded-md p-2 flex justify-around items-center w-28 sm:w-32">
            <button
              className="cursor-pointer"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <MinusIcon className="bg-white text-[var(--mainColor)] rounded-sm duration-300 transition-all hover:bg-cyan-400" />
            </button>
            <span className="text-base sm:text-lg font-semibold">
              {quantity}
            </span>
            <button
              className="cursor-pointer"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <PlusIcon className="bg-white text-[var(--mainColor)] rounded-sm duration-300 transition-all hover:bg-cyan-400" />
            </button>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              variant="secondary"
              className="rounded-md text-white !bg-[var(--mainColor)] !p-2.5 lg:p-0 border-none hover:!bg-cyan-400 flex items-center gap-2 text-sm sm:text-base"
              iconLeft={<ShoppingCartIcon fontSize="small" />}
            >
              Add To Cart
            </Button>
            {cardIconArray.slice(0, 2).map((item, index) => (
              <div key={index}>
                <button className="relative group/button p-2 hover:bg-cyan-400 bg-[var(--mainColor)] rounded-md cursor-pointer">
                  {item.icon}

                  <span className="absolute left-1/2 -translate-x-1/2 -top-10 opacity-0 group-hover/button:opacity-100 bg-cyan-400 text-white px-3 py-1 rounded-sm whitespace-nowrap transition-all duration-300 pointer-events-none text-xs sm:text-sm">
                    {item.title}
                  </span>
                </button>
              </div>
            ))}
          </div>

          <hr className="opacity-20" />

          {/* Product Info Grid */}
          <dl className="grid grid-cols-[100px_1fr] sm:grid-cols-[150px_1fr] gap-y-2 uppercase text-xs sm:text-sm lg:text-base">
            <dt className="font-bold">Brand</dt>
            <dd>{product.brand}</dd>

            <dt className="font-bold">SKU</dt>
            <dd>{product.sku}</dd>

            <dt className="font-bold">Status</dt>
            <dd>{product.status}</dd>

            <dt className="font-bold">Tags</dt>
            <dd className="break-words">{product.tags.join(", ")}</dd>

            <dt className="font-bold">Category</dt>
            <dd>{product.category}</dd>
          </dl>

          <hr className="opacity-20" />

          {/* Delivery Info */}
          <div className="space-y-2">
            {deliveryInfo.map((info, index) => (
              <span
                key={index}
                className="text-gray-600 flex text-sm sm:text-base lg:text-lg items-center gap-2"
              >
                <CheckCircleOutline className="text-gray-600 flex-shrink-0" />
                <span>{info.title}</span>
              </span>
            ))}
          </div>

          <hr className="opacity-20" />

          {/* Payment Section */}
          <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mt-4">
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              Secure Payments
            </p>
            <img
              src={paymentsCards}
              alt="Payment Cards"
              loading="lazy"
              className="h-6 sm:h-8 object-contain"
            />
          </section>

          {/* Social Media */}
          <div className="mt-4 sm:mt-6">
            <SocialMediaBar
              allSocialMediaIcons={allSocialMediaIcons.slice(0, 7)}
            />
          </div>
        </div>
      </div>
      <div className="pb-20">
        <ProductDetailsInfo product={product} />
        <RelatedProducts product={product} />
      </div>
    </>
  );
}

export default ProductDetailsPage;
