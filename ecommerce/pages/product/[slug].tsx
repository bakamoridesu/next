import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { client, urlFor } from "../../lib/client";
import { ParsedUrlQuery } from "querystring";
import { IProduct } from "../../types/product";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components/Product";
import { useState } from "react";
import { useStateContext } from "../../context/StateContext";
const ProductDetails = ({
  product,
  similarProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { image, name, price, details } = product
  const [index, setIndex] = useState(0);
  const imageProps = useNextSanityImage(client, image[index]);
  const { increaseQuantity, decreaseQuantity, quantity, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, quantity)
    setShowCart(true)
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image {...imageProps} alt={name} className="product-detail-image"/>
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <Image
                key={i}
                width={200}
                height={200}
                src={urlFor(item).width(200).url()}
                alt="product"
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p>{20}</p>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={() => decreaseQuantity()}>
                <AiOutlineMinus />
              </span>
              <span className="num">
                {quantity}
              </span>
              <span className="plus" onClick={() => increaseQuantity()}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, quantity)}>
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={() => handleBuyNow()}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {similarProducts.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;

type Props = {
  product: IProduct;
  similarProducts: IProduct[];
};

interface Query extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  const { slug } = context.params!;
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = (await client.fetch(productQuery)) as IProduct;

  const similarProductsQuery = `*[_type == "product"]`;
  const similarProducts = (await client.fetch(
    similarProductsQuery
  )) as IProduct[];
  return {
    props: {
      product,
      similarProducts,
    },
  };
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
  const products = (await client.fetch(query)) as IProduct[];
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
