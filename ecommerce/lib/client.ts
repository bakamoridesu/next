import sanityClient from "@sanity/client";

export const client = sanityClient({
    projectId: '8e0j31yr',
    dataset: 'production',
    useCdn: true,
})
