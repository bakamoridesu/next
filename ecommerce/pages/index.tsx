import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FooterBanner } from "../components/FooterBanner";
import { HeroBanner } from "../components/HeroBanner";
import { Product } from "../components/Product";
import { IProduct } from "../types/product";
import { client } from "../lib/client";
import { IBanner } from "../types/banner";

const Home = ({
  products,
  banners,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log({ banners });
  console.log({ products });
  return (
    <>
      <HeroBanner heroBanner={banners[0]} />
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner />
    </>
  );
};

type Data = {
  products: IProduct[];
  banners: IBanner[];
};

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = (await client.fetch(productsQuery)) as IProduct[];

  const bannerQuery = '*[_type == "banner"]';
  const banners = (await client.fetch(bannerQuery)) as IBanner[];

  return {
    props: {
      products,
      banners,
    },
  };
};

export default Home;
