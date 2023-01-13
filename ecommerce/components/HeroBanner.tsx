import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { client } from "../lib/client";
import { IBanner } from "../types/banner";

type Props = {
  heroBanner: IBanner;
};
export const HeroBanner = ({ heroBanner }: Props) => {
  if(!heroBanner) return null
  const imageProps = useNextSanityImage(client, heroBanner.image);
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <Image
          {...imageProps}
          alt="headphones"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
