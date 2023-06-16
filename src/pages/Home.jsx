import React from "react";
import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Cards, OrderCart } from "../components";
import { getAllPrducts } from "../api";
import { useQuery } from "react-query";

function Home() {
  const { isLoading, data, isError, error, refetch } = useQuery(
    "categories",
    getAllPrducts
  );

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner thickness="4px" emptyColor="gray.200" size="md" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="100vh">
        <Text fontWeight="semibold">{error.message}</Text>
      </Center>
    );
  }

  const reload = () => {
    console.log("refetching...");
    refetch();
  };

  // console.log({isLoading, data, isError, error, refetch})

  return (
    <>
      <Grid
        maxW={"100%"}
        h={"auto"}
        p="4"
        gap={4}
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
      >
        {data?.data.map((item, id) => (
          <GridItem key={id}>
            <Cards {...item} index={id} />
          </GridItem>
        ))}
      </Grid>

      <Flex
        justifyContent="flex-end"
        position="sticky"
        bottom="0px"
        right="0px"
      >
        <OrderCart reload={reload}/>
      </Flex>
    </>
  );
}

export default Home;
