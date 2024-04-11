import { Card, Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

interface Restaurants {
  resId: string;
  name: string;
  description: string;
  photoList: string[];
  isAlrBook?: boolean;
}

export default function ResCard({
  resId,
  name,
  description,
  photoList,
  isAlrBook,
}: Restaurants) {
  return (
    <Card
      direction={{ base: "column", lg: "row" }}
      maxW={{ base: "100%", lg: "45%" }}
    >
      <Box
        w={{ base: "100%", lg: "240px" }}
        minW={"240px"}
        h="240px"
        overflow="hidden"
        borderTopLeftRadius={"8px"}
        borderTopRightRadius={{ base: "8px", lg: "0px" }}
        borderBottomLeftRadius={{ base: "0px", lg: "8px" }}
        pos="relative"
      >
        <Image
          fill
          objectFit="cover"
          src={photoList[0]}
          alt="restaurant name"
          sizes="240px"
        />
      </Box>
      <Flex flexDir="column" p={"24px"} justify={"space-between"} gap={"8px"}>
        <Flex flexDir="column" gap={"16px"}>
          <Heading size={"md"}>{name}</Heading>
          <Text noOfLines={4}>{description}</Text>
        </Flex>
        <Flex
          flexDir={{ base: "column-reverse", lg: "row-reverse" }}
          justify={"space-between"}
          gap={"8px"}
        >
          <Link href={`/${resId}`}>
            <Box
              bg={"primary.100"}
              color={"white"}
              w={{ base: "100%", lg: "auto" }}
              p={"4px 16px"}
              borderRadius={"4px"}
              border={"1px"}
              borderStyle={"solid"}
              borderColor={"primary.100"}
              cursor={"pointer"}
              textAlign={"center"}
            >
              select
            </Box>
          </Link>
          {isAlrBook && (
            <Box
              bg={"alert.200"}
              color={"alert.100"}
              p={"4px 6px"}
              borderRadius={"4px"}
              border={"1px"}
              borderStyle={"solid"}
              borderColor={"alert.100"}
              cursor={"default"}
              maxW={"80px"}
              textAlign={"center"}
            >
              booked
            </Box>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
