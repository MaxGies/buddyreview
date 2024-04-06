import Image from "next/image";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

interface Params {
  params: {
    restaurant: string;
  };
}

async function getRestaurant(resId: string) {
  const result = await fetch(`http://localhost:3000/api/restaurant/${resId}`);
  return result.json();
}

export default async function Restaurant({ params }: Params) {
  const restaurantData = getRestaurant(params.restaurant);

  const [restaurantItem] = await Promise.all([restaurantData]);

  if (restaurantItem.length === 0) {
    return <>No Data</>;
  }

  return (
    <Flex
      w="100%"
      direction={{ base: "column" }}
      gap={"24px"}
      pb={{ base: "96px", lg: "56px" }}
    >
      <Box
        w={"100%"}
        minW={"240px"}
        h={{ base: "260px", lg: "360px" }}
        overflow="hidden"
        borderRadius={"8px"}
        pos="relative"
      >
        <Image
          layout="fill"
          objectFit="cover"
          src={restaurantItem[0].photo[0]}
          alt="restaurant name"
          priority
        />
      </Box>
      <Heading>{restaurantItem[0].name}</Heading>
      <Text>{restaurantItem[0].description}</Text>
      <Heading>Photos</Heading>
      <Flex flexDir={"row"} flexWrap={"wrap"} gap={"24px"}>
        {restaurantItem[0].photo.map((img: string, index: number) => {
          return (
            <Box
              key={index}
              w={"240px"}
              h={"240px"}
              overflow="hidden"
              borderRadius={"8px"}
              pos="relative"
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={img}
                alt="restaurant details image"
                priority
              />
            </Box>
          );
        })}
      </Flex>
      <Flex
        pt={{ base: "0px", lg: "48px" }}
        width={"100%"}
        justify={"center"}
        pos={{ base: "fixed", lg: "static" }}
        bottom={"0px"}
        left={"0px"}
        right={"0px"}
      >
        <Link href={`/${params.restaurant}/booking`}>
          <Box
            bg={"primary.100"}
            color={"white"}
            p={{ base: "16px 24px", lg: "16px 96px" }}
            borderRadius={{ base: "0px", lg: "8px" }}
            fontSize={"24px"}
            w={{ base: "100vw", lg: "auto" }}
            textAlign={"center"}
          >
            Make a booking
          </Box>
        </Link>
      </Flex>
    </Flex>
  );
}
