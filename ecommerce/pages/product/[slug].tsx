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
const ProductDetails = ({
  product: { image, name, price, details },
  similarProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const imageProps = useNextSanityImage(client, image[0]);
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image {...imageProps} alt={name} />
          </div>
          {/* <div className="small-images-container">
            {image?.map((item, i) => (
              <Image
                key={i}
                width={200}
                height={200}
                src={urlFor(item).width(200).url()}
                alt="product"
              />
            ))}
          </div> */}
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
              <span className="minus" onClick={() => {}}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick={() => {}}>
                0
              </span>
              <span className="plus" onClick={() => {}}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => {}}>
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={() => {}}>
              Buy Now
            </button>
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
