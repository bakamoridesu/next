import sanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'
import { IImage } from "../types/product";

export const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: IImage) => builder.image(source)

