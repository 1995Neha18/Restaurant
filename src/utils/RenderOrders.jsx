import {
  Box,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Context } from "../contextApi";

const RenderOrders = ({ orderItems }) => {
  const { dispatch } = React.useContext(Context);

  const [state, setState] = React.useState(orderItems);

  const totalPrice = state.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  React.useEffect(() => {
    dispatch({ type: "SET_ORDER_PRICE", payload: totalPrice });
  }, [dispatch, totalPrice]);

  const handleDecrement = useCallback(
    (id, index) => {
      setState((prev) => {
        let newCount = [...prev];
        newCount[index].quantity =
          newCount[index].quantity === 1 ? 1 : newCount[index].quantity - 1;
        return newCount;
      });
      dispatch({ type: "SET_ORDER_PRICE", payload: totalPrice });
    },
    [dispatch, totalPrice]
  );

  const handleIncrement = useCallback(
    (id, index) => {
      setState((prev) => {
        let newCount = [...prev];
        newCount[index].quantity = newCount[index].quantity + 1;
        return newCount;
      });
      dispatch({ type: "SET_ORDER_PRICE", payload: totalPrice });
    },
    [dispatch, totalPrice]
  );

  const handleRemove = useCallback((id, idx) => {
    setState((prev) => {
      let newCount = [...prev];
      let filtered = newCount.filter((item, index) => index !== idx);
      return filtered;
    });
  }, []);




  return (
    <Box my="5">
      <Heading
        fontWeight={"bold"}
        fontFamily={"heading"}
        fontSize={"1em"}
        borderBottom="2px solid #F1F1F1"
        pb="4"
        mb="4"
      >
        Order Details
      </Heading>
      <Stack direction={["column", "column"]} spacing="4">
        {state.map((item, id) => (
          <Flex key={id} justifyContent={"space-between"}>
            <VStack align="left">
              <Text fontSize="sm" fontWeight="bold">
                {item.name}
              </Text>
              <Text
                fontSize="xs"
                color="red.500"
                cursor="pointer"
                onClick={() => handleRemove(item.id, id)}
              >
                Remove Item
              </Text>
            </VStack>
            <VStack textAlign="right">
              <HStack spacing={4}>
                <AiOutlinePlusCircle
                  style={{ cursor: "pointer", color: "red" }}
                  fontSize={"20px"}
                  onClick={() => handleIncrement(item.id, id)}
                />
                <Text fontSize="sm" fontWeight="bold">
                  {item.quantity}
                </Text>
                <AiOutlineMinusCircle
                  style={{ cursor: "pointer", color: "red" }}
                  fontSize={"20px"}
                  onClick={() => handleDecrement(item.id, id)}
                />
              </HStack>
              <Text
                fontSize="sm"
                fontWeight="bold"
                position={"relative"}
                left="20px"
              >
                ₹ {item.price}
              </Text>
            </VStack>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default RenderOrders;
