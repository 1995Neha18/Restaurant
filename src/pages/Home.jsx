import React from "react";
import {
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import { Cards, OrderCart } from "../components";
import { UpdatedComponent } from "../hoc";

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
          <GridItem>
            <Cards key={id} {...item} index={id} />
          </GridItem>
        ))}
      </Grid>

      {/* <Container
        maxW="100%"
        p="4"
        display="flex"
        flexWrap="wrap"
        alignItems="flex-start"
      >
        {data?.data.map((item, id) => (
          <Cards key={id} {...item} index={id} />
        ))}
      </Container> */}
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
