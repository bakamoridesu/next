import { Box, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { GoVerified } from "react-icons/go";
import { ImageScrollBar } from "../../components/ImageScrollBar";
import { IPropertyDetails } from "../../components/propertyDetailType";
import { baseUrl, fetchApi } from "../../utils/fetchApi";

type Props = {
  propertyDetails: IPropertyDetails;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const { id } = context.params!;
  const data = (await fetchApi(
    `${baseUrl}/properties/detail?externalID=${id}`
  )) as IPropertyDetails;

  return {
    props: {
      propertyDetails: data,
    },
  };
};

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Box maxWidth="1000px" margin="auto" p="4">
    {photos && <ImageScrollBar data={photos} />}
    <Box w="full" p="6">
      <Flex paddingTop="2" alignItems="center">
        <Box paddingRight="3" color="green.400">
            {isVerified && <GoVerified/>}
        </Box>
      </Flex>
    </Box>
  </Box>
);

export default PropertyDetails;
