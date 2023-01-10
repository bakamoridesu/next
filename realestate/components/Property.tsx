import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { IProperty } from "./types";
import { GoVerified } from "react-icons/go";
import { BsGridFill } from "react-icons/bs";
import { FaBed, FaBath } from "react-icons/fa";

import defaultImage from "../assets/images/house.jpg";
import millify from "millify";
type TPropertyProps = {
  property: IProperty;
};

export const Property = ({ property }: TPropertyProps) => (
  <Link href={`/property/${property.externalID}`} passHref>
    <Flex
      flexWrap={"wrap"}
      w="420px"
      p="5"
      paddingTop={"0"}
      justifyContent="flex-start"
      cursor="pointer"
    >
      <Box>
        <Image
          src={property.coverPhoto ? property.coverPhoto.url : defaultImage}
          alt="house"
          width={400}
          height={260}
          style={{ height: "260px" }}
        />
      </Box>

      <Box w="full">
        <Flex paddingTop={2} alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box paddingRight="3" color={"green.400"}>
              {property.isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(property.price)}
              {property.rentFrequency && `/${property.rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={property.agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex gap={2} alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400" >
          {property.rooms} <FaBed /> | {property.baths} <FaBath /> |{" "}
          {millify(property.area)} sqft <BsGridFill />
        </Flex>
        <Text fontSize="lg">
          {property.title.length > 30
            ? `${property.title.substring(0, 30)}...`
            : property.title}
        </Text>
      </Box>
    </Flex>
  </Link>
);
