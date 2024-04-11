"use client";

import {
  Flex,
  Input,
  Heading,
  Text,
  Avatar,
  Show,
  Hide,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCenterStorageState } from "@/context/CenterStorage";

export default function Navbar() {
  const pathname = usePathname();
  const { bookingAmount, actions, filterText } = useCenterStorageState();

  return (
    <>
      <Flex
        bg="wood.200"
        flexDir="column"
        pos="fixed"
        top="0"
        left="0"
        right="0"
        p={{ base: "16px", md: "32px", xl: "32px 0" }}
        align="center"
        gap="24px"
        zIndex={1000}
      >
        <Flex
          flexDir="row"
          align="center"
          justify="space-between"
          maxW={{ base: "100%", xl: "1280px" }}
          w={{ base: "100%", xl: "1280px" }}
          m="auto"
          color="white"
        >
          <Link href={"/"}>
            <Heading fontSize={{ base: "2xl", md: "4xl" }}>
              TableBooking
            </Heading>
          </Link>
          <Hide breakpoint="(max-width: 600px)">
            <Link href={"/manage"}>
              <Text fontSize="xl">Manage Booking ({bookingAmount})</Text>
            </Link>
          </Hide>
          <Show breakpoint="(max-width: 600px)">
            <Link href={"/manage"}>
              <Avatar
                _after={{
                  content: `"${bookingAmount}"`,
                  borderRadius: "50%",
                  background: "error.100",
                  color: "error.200",
                  position: "absolute",
                  w: "22px",
                  h: "22px",
                  fontSize: "14px",
                  top: "-6px",
                  right: "-6px",
                }}
              />
            </Link>
          </Show>
        </Flex>
        {pathname === "/" && (
          <Input
            placeholder="Restaurant Filter..."
            maxW={{ base: "100%", md: "580px" }}
            bg={"white"}
            onChange={(e) => actions.sendTextFilter(e.target.value)}
            value={filterText}
          />
        )}
      </Flex>
      <Box
        pt={{
          base: pathname === "/" ? "144px" : "80px",
          md: pathname === "/" ? "172px" : "108px",
        }}
      ></Box>
    </>
  );
}
