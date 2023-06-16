import React from "react";
import { Center, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { Cards, OrderCart } from "../components";
import { UpdatedComponent } from "../hoc";
import { Context } from "../contextApi";

function Home({ isLoading, data, isError, error }) {

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner thickness="4px" emptyColor="gray.200" size="md" />
      </Center>
    );
  }
  if (isError) {
    return <Center h="100vh">{error.message}</Center>;
  }
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
        <OrderCart />
      </Flex>
    </>
  );
}

export default UpdatedComponent(Home);
