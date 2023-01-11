import { useContext } from "react";
import Image from "next/image";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Photo } from "./propertyDetailType";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginLeft="1">
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

type Props = {
  data: Photo[];
};

export const ImageScrollBar = ({ data }: Props) => {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item) => (
        <Box
          width={["330px", "500px", "910px"]}
          key={item.id}
          itemID={String(item.id)}
          overflow="hidden"
          p="1"
        >
          <Image
            alt="pr"
            src={item.url}
            width={1000}
            height={500}
            loading="eager"
            sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
};
