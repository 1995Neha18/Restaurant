import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCurrencyRupee } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Context } from "../contextApi";
import React from "react";
import { CustomInput, RenderOrders } from "../utils";
import { toast } from "react-toastify";

function OrderCart({ reload }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setData] = React.useState({
    name: "",
    mobile: "",
  });

  const [totalPrice, setTotalPrice] = React.useState(0);
  const {
    state: { orderItems, orderPrice },
  } = React.useContext(Context);

  let orderList = Object.values(orderItems)
    .map((item) => {
      return Object.values(item);
    })
    .flat();

  // console.log("orderList", orderList);

  let total = Object.values(orderItems).reduce((acc, item) => {
    return (
      acc +
      Object.values(item).reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0)
    );
  }, 0);

  const handleSubmit = () => {
    if (!formData.name.trim() || formData.mobile.length !== 10) {
      toast.error("Please fill all the fields");
      return;
    }
    const order = {
      customer: formData,
      orderItems,
      orderPrice,
    };
    console.log(order);
    toast.success("Order Placed Successfully");
    onClose();
  };

  React.useEffect(() => {
    setTotalPrice(total);
  }, [total]);
  return (
    <>
      <Box>
        <Button
          _hover="none"
          bg="none"
          color="#521639"
          _active="none"
          onClick={reload}
        >
          <RiDeleteBinLine fontSize="2em" />
        </Button>
        <Button
          onClick={onOpen}
          bg="#521639"
          color="white"
          borderRadius="0"
          border="none"
          _hover="none"
          px="10"
          py="6"
        >
          <IoDocumentTextOutline fontSize="1.8em" />

          <Text
            fontSize="1.8em"
            px="4"
            py="2"
            display={"flex"}
            alignItems={"center"}
          >
            <BsCurrencyRupee />
            {totalPrice}
          </Text>
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent bg="white" color="black">
          <ModalHeader
            px="4"
            color="#521639"
            fontWeight={"bold"}
            fontFamily={"heading"}
            fontSize={"1.2em"}
            borderBottom="2px solid #F1F1F1"
          >
            Customer Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CustomInput setData={setData} formData={formData} />
            <RenderOrders orderItems={orderList} />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleSubmit}
              bg="#521639"
              color="white"
              borderRadius="0"
              border="none"
              _hover="none"
              px="4"
              py="4"
              _active="none"
            >
              <IoDocumentTextOutline fontSize="1.5em" />

              <Text
                fontSize="1.5em"
                px="4"
                py="2"
                display={"flex"}
                alignItems={"center"}
              >
                <BsCurrencyRupee />
                {orderPrice}
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OrderCart;
