import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { getPropertyListForRent, getPropertyListForSale } from "../utils/propertiesList";
import { ListPropertiesResponse, Property } from "./types";

type BannerProps = {
  purpose: string;
  imageUrl: string;
  title1: string;
  title2: string;
  desc1: string;
  desc2: string;
  linkName: string;
  buttonText: string;
};
function Banner({
  purpose,
  imageUrl,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
}: BannerProps) {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Image src={imageUrl} width={500} height={300} alt="banner" />
      <Box p="5">
        <Text color="gray.500" fontSize={"sm"} fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize={"3xl"} fontWeight="bold">
          {title1}
          <br />
          {title2}
        </Text>
        <Text fontSize={"lg"} padding="3px 0" color="gray.700">
          {desc1}
          <br />
          {desc2}
        </Text>
        <Button fontSize={"xl"} color="black">
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
}

type HomeProps = {
  propertiesForSale: Property[]
  propertiesForRent: Property[]
}

export default function Home({ propertiesForSale, propertiesForRent } : HomeProps) {
  console.log({propertiesForRent, propertiesForSale})
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap={"wrap"}>
        {/* Fetch the properties and map over them... */}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap={"wrap"}>
        {/* Fetch the properties and map over them... */}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await getPropertyListForSale() as ListPropertiesResponse
  const propertyForRent = await getPropertyListForRent() as ListPropertiesResponse

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}