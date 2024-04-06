import { Card, Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

interface BookingCard {
  name: string;
  info: string[];
  photo: string;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
}

const infoList = ["Name", "Table Size", "Date", "Time"];

export default function ManageCard({
  name,
  info,
  photo,
  onDelete,
}: BookingCard) {
  return (
    <Card direction={{ base: "column", lg: "row" }} maxW={{ base: "100%" }}>
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
          src={photo}
          alt="restaurant name"
          sizes="240px"
        />
      </Box>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        p={"24px"}
        justify={"space-between"}
        gap={"8px"}
        w={"100%"}
      >
        <Flex flexDir="column" gap={"4px"}>
          <Heading size={"md"} mb={"12px"}>
            {name}
          </Heading>
          {info.map((detail, index) => (
            <Text key={index}>
              {infoList[index]}: {detail}
            </Text>
          ))}
        </Flex>
        <Flex align={"center"}>
          <Box
            bg={"error.200"}
            color={"error.100"}
            p={"16px"}
            borderRadius={"4px"}
            border={"1px"}
            borderStyle={"solid"}
            borderColor={"error.100"}
            cursor={"pointer"}
            textAlign={"center"}
            onClick={onDelete}
          >
            Bin
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
}
