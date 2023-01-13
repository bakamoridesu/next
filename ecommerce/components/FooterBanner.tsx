import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { client } from '../lib/client'
import { IBanner } from '../types/banner'

type Props = {
  footerBanner: IBanner
}
export const FooterBanner = ({ footerBanner: {
  discount,
  largeText1,
  largeText2,
  saleTime,
  smallText,
  midText,
  product,
  buttonText,
  image,
  desc,
} } : Props) => {
  const imageProps = useNextSanityImage(client, image)
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <Image {...imageProps} alt={product} className="footer-banner-image"/>
      </div>
    </div>
  )
}