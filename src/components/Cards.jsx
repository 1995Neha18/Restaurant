import { Box, Circle, Text } from "@chakra-ui/react";
import React from "react";
import { CiCircleMinus } from "react-icons/ci";
import { Context } from "../contextApi";

const Cards = ({ name, products, slug }) => {
  const { dispatch } = React.useContext(Context);

  const initials = products.map((item) => ({
    id: item._id,
    quantity: 0,
    price: item.price,
    name: item.name,
  }));

  const [count, setCount] = React.useState(initials);

  const handleDecrement = (id, index, price, name) => {
    let newCount = [...count];
    newCount[index].quantity = newCount[index].quantity - 1;
    setCount(newCount);
    const payload = {
      [slug]: { [id]: { price, name, quantity: newCount[index].quantity } }
    };
    console.log("decrement", payload);
    dispatch({ type: "SET_ORDER_ITEMS", payload });
  };

  const handleIncrement = (id, index, price, name) => {
    let newCount = [...count];
    newCount[index].quantity = newCount[index].quantity + 1;
    setCount(newCount);

    const payload = {
      [slug]: { [id]: { price, name, quantity: newCount[index].quantity } }
    };
    console.log("increment", payload);

    dispatch({ type: "SET_ORDER_ITEMS", payload });
  };

  React.useEffect(() => {
    setCount(initials);
  }, [slug]);

  return (
    <Box w={"300px"} bg="white" pt="6" pb="4" borderRadius="md" m="5">
      <Text
        bg="#eff0f5"
        px="4"
        py="2"
        color={"#7d566d"}
        fontFamily={"monospace"}
        fontWeight={"extrabold"}
        fontSize={"18px"}
      >
        {name}
      </Text>
      {products.map((item, idx) => (
        <Box
          key={idx}
          display="flex"
          justifyContent="space-between"
          borderBottom={"1px solid #eff0f5"}
          py="2"
          px="4"
          _hover={{ bg: "#eff0f5" }}
          position={"relative"}
          color="black"
        >
          <Text
            cursor={"pointer"}
            onClick={() =>
              handleIncrement(item._id, idx, item.price, item.name)
            }
          >
            {item.name}
          </Text>
          <Text>{item.price}</Text>
          {count[idx].quantity !== 0 && (
            <CiCircleMinus
              style={{ position: "absolute", right: "45px", top: "10px" }}
              color="red"
              fontSize={"22px"}
              fontWeight={"400"}
              onClick={() =>
                handleDecrement(item._id, idx, item.price, item.name)
              }
              cursor={"pointer"}
            />
          )}
          {count[idx].quantity !== 0 && (
            <Circle
              size="20px"
              bg="red.400"
              position="absolute"
              left="-10px"
              top="-5px"
              color="white"
            >
              <Text fontSize="12px" fontWeight="bold">
                {count[idx].quantity}
              </Text>
            </Circle>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Cards;
