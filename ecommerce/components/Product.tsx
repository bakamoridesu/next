import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";
import { client } from "../lib/client";
import { IProduct } from "../types/product";

type Props = {
  product: IProduct;
};

export const Product = ({ product: { image, name, slug, price } }: Props) => {
  const imageProps = useNextSanityImage(client, image[0]);
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            {...imageProps}
            alt={name}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};
