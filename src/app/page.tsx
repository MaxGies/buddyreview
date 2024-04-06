"use client";

import { Flex, Spinner, Heading, Button } from "@chakra-ui/react";
import ResCard from "./_components/ResCard";
import { useCenterStorageState } from "../context/CenterStorage";

export default function Home() {
  const { resList, resAll, actions } = useCenterStorageState();

  return (
    <Flex
      w="100%"
      direction={{ base: "column", md: "row" }}
      wrap="wrap"
      gap={"32px"}
      justify={"center"}
      align={"center"}
    >
      {resAll.length > 0 ? (
        resList.length > 0 ? (
          resList.map((res, index) => (
            <ResCard
              key={res.id}
              resId={res.id}
              name={res.name}
              description={res.description}
              photoList={res.photo}
              isAlrBook={index % 2 == 0}
            />
          ))
        ) : (
          <>
            <Flex pt={"36px"} gap={"16px"} flexDir={"column"}>
              <Heading>Not Found Search</Heading>
              <Button
                onClick={actions.removeFilter}
                bg={"primary.100"}
                color={"white"}
              >
                Clear
              </Button>
            </Flex>
          </>
        )
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="primary.100"
          size="xl"
        />
      )}
    </Flex>
  );
}
