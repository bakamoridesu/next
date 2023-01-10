import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import millify from "millify";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { BsGridFill } from "react-icons/bs";
import { FaBath, FaBed } from "react-icons/fa";
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log({ amenities });
  return (
    <Box maxWidth="1000px" margin="auto" p="4">
      {photos && <ImageScrollBar data={photos} />}
      <Box w="full" p="6">
        <Flex paddingTop={2} alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box paddingRight="3" color={"green.400"}>
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          gap={2}
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
          <BsGridFill />
        </Flex>
        <Box marginTop="2">
          <Text fontSize="lg" marginBottom="2" fontWeight="bold">
            {title}
          </Text>
          <Text lineHeight="2" color="gray.600">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Text>
        </Box>
        <Flex
          flexWrap="wrap"
          textTransform="uppercase"
          justifyContent="space-between"
        >
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            padding="3"
          >
            <Text>Type</Text>
            <Text fontWeight="bold">{type}</Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            padding="3"
          >
            <Text>Purpose</Text>
            <Text fontWeight="bold">{purpose}</Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              padding="3"
            >
              <Text>Furnishing status</Text>
              <Text fontWeight="bold">{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>
        <Box>
          {amenities.length && (
            <Text fontSize="2xl" fontWeight="black" marginTop="5">
              Amenities
            </Text>
          )}
          <Flex flexWrap="wrap">
            {amenities.map((item) => (
                item.amenities.map((amenity: any) => (
                    <Text key={amenity.slug} fontWeight="bold" color="blue.400" fontSize="l" p="2" bg="gray.200" m="1" borderRadius={5}>{amenity.text}</Text>
                ))
            ))}
        </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
