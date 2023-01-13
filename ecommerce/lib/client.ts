import sanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'
import { IImage } from "../types/product";

export const client = sanityClient({
    projectId: '8e0j31yr',
    dataset: 'production',
    useCdn: true,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: IImage) => builder.image(source)

