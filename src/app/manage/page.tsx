"use client";

import { Flex, Heading, Text, Box } from "@chakra-ui/react";
import Link from "next/link";
import { deleteBooking } from "../_actions/action";
import ManageCard from "../_components/ManageCard";
import { useCenterStorageState } from "../../context/CenterStorage";

export default function ManageBooking() {
  const { actions, bookingList, resAll } = useCenterStorageState();

  const handlerDelete = async (id: string) => {
    await deleteBooking(id);
    actions.updateBooking();
  };

  const handleSelectRes = (resId: string) => {
    return resAll.filter((res) => resId === res.id)[0];
  };

  return (
    <Flex
      w="100%"
      direction={{ base: "column" }}
      gap={"24px"}
      pb={{ base: "96px", lg: "56px" }}
      pt={{ base: "0", lg: "32px" }}
    >
      <Heading>Manage my bookings</Heading>
      {bookingList.length > 0 ? (
        <>
          <Text fontSize={"16px"}>upcoming</Text>
          <Flex gap={"32px"} flexDir={"column"}>
            {bookingList.map((info) => (
              <ManageCard
                key={`${info.id}_${info.name}`}
                name={handleSelectRes(info.resId).name}
                photo={handleSelectRes(info.resId).photo[0]}
                info={[info.name, info.size, info.date, info.time]}
                onDelete={() => handlerDelete(info.id)}
              />
            ))}
          </Flex>
        </>
      ) : (
        <>
          <Text fontSize={"16px"}>not found booking</Text>
          <Link href="/">
            <Box
              borderRadius={"8px"}
              p={"8px 16px"}
              bg={"primary.100"}
              color={"white"}
              w={"fit-content"}
            >
              back to home
            </Box>
          </Link>
        </>
      )}
    </Flex>
  );
}
