"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { getRestaurant, sendBooking } from "../../_actions/action";
import { useCenterStorageState } from "@/context/CenterStorage";
import dayjs from "dayjs";

interface Params {
  params: {
    restaurant: string;
  };
}

interface Restaurants {
  id: string;
  name: string;
  description: string;
  photo: string[];
}

const peopleAmountArr = ["1 person", "2 people", "3 people", "4+ people"];

export default function BookingForm({ params }: Params) {
  const [restaurantItem, setRestaurantItem] = useState<Restaurants[]>([]);
  const [name, setName] = useState("");
  const [amountPeople, setAmoutPeople] = useState(peopleAmountArr[0]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEnabledCheck, setIsEnabledCheck] = useState(false);
  const { actions } = useCenterStorageState();
  const today = dayjs().format("YYYY-MM-DD");

  const router = useRouter();

  const handlerSendForm = useCallback(() => {
    setIsEnabledCheck(true);
    if (name.trim() === "" || bookingDate === "") return;

    onOpen();
  }, [name, bookingDate]);

  const handlerSendBooking = useCallback(async () => {
    await sendBooking({
      name: name,
      size: amountPeople,
      date: dayjs(bookingDate).format("DD/MM/YYYY"),
      time: bookingTime,
      resId: params.restaurant,
    });
    actions.updateBooking();
    router.push("/");
  }, [name, amountPeople, bookingDate, bookingTime, params.restaurant]);

  useEffect(() => {
    getRestaurant(params.restaurant)
      .then((data) => setRestaurantItem(data))
      .catch((err) => console.warn("Error: " + err.message));
  }, []);

  return (
    <>
      <Flex
        w="100%"
        direction={{ base: "column" }}
        gap={"24px"}
        pb={{ base: "96px", lg: "56px" }}
        pt={{ base: "0", lg: "32px" }}
      >
        {restaurantItem.length > 0 ? (
          <>
            <Heading>Make a booking for {restaurantItem[0]?.name}</Heading>
            <Flex gap={"32px"} flexDir={"column"}>
              <FormControl isInvalid={isEnabledCheck && name.trim() === ""}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <FormErrorMessage>Name is required.</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Table size</FormLabel>
                <Flex flexDir={"row"} flexWrap={"wrap"} gap={"16px"}>
                  {peopleAmountArr.map((text) => (
                    <Flex
                      key={text}
                      w={{ base: "calc(50% - 8px)", lg: "100px" }}
                      h={"100px"}
                      bg={amountPeople === text ? "wood.100" : "white"}
                      border={"1px solid"}
                      borderColor={"wood.100"}
                      align={"center"}
                      justify={"center"}
                      borderRadius={"6px"}
                      color={amountPeople === text ? "white" : "wood.100"}
                      onClick={() => {
                        setAmoutPeople(text);
                      }}
                      cursor={"pointer"}
                    >
                      {text}
                    </Flex>
                  ))}
                </Flex>
              </FormControl>
              <FormControl isInvalid={isEnabledCheck && bookingDate === ""}>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  onChange={(e) => setBookingDate(e.target.value)}
                  value={bookingDate}
                  min={today}
                />
                <FormErrorMessage>Date is required.</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Time</FormLabel>
                <Select
                  onChange={(e) => setBookingTime(e.target.value)}
                  value={bookingTime}
                >
                  <option value="10:00">10:00</option>
                  <option value="12:00">12:00</option>
                  <option value="14:00">14:00</option>
                  <option value="16:00">16:00</option>
                  <option value="18:00">18:00</option>
                  <option value="20:00">20:00</option>
                </Select>
              </FormControl>
              <Box
                borderRadius={"8px"}
                bg={"primary.100"}
                padding={"8px 32px"}
                color={"white"}
                w={"fit-content"}
                mt={"32px"}
                cursor={"pointer"}
                onClick={handlerSendForm}
              >
                make a booking
              </Box>
            </Flex>
          </>
        ) : (
          <Flex w={"100%"} justify={"center"} align={"center"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="primary.100"
              size="xl"
            />
          </Flex>
        )}
      </Flex>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={"auto 16px"}>
          <ModalHeader>Do you want to make this booking? </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="8px">
              {restaurantItem[0]?.name}
            </Text>
            <Flex gap={"8px"}>
              <Text fontWeight={"bold"}>Name: </Text> {name}
            </Flex>
            <Flex gap={"8px"}>
              <Text fontWeight={"bold"}>Table size: </Text> {amountPeople}
            </Flex>
            <Flex gap={"8px"}>
              <Text fontWeight={"bold"}>Date: </Text>{" "}
              {dayjs(bookingDate).format("DD/MM/YYYY")}
            </Flex>
            <Flex gap={"8px"}>
              <Text fontWeight={"bold"}>Time: </Text> {bookingTime}
            </Flex>
          </ModalBody>

          <ModalFooter gap={"12px"}>
            <Box
              onClick={onClose}
              p={"8px 16px"}
              bg={"grayScale.400"}
              borderRadius={"8px"}
              cursor={"pointer"}
            >
              cancel
            </Box>
            <Box
              onClick={handlerSendBooking}
              p={"8px 16px"}
              color={"white"}
              bg={"primary.100"}
              borderRadius={"8px"}
              cursor={"pointer"}
            >
              Confirm
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
