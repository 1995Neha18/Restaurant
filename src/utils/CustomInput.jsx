import {
  Flex,
  FormLabel,
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";

export default function CustomInput({ setData, formData }) {
  return (
    <Flex flexDirection="row-reverse" justifyContent="space-between">
      <Box>
        <FormLabel fontSize="sm">Mobile Number</FormLabel>
        <InputGroup bg="none" size="xs">
          <InputLeftAddon children="+91" bg="none" borderRight="none" />
          <Input
            type="tel"
            borderLeft="none"
            placeholder="Enter number"
            borderRight="none"
            value={formData.mobile}
            onChange={(e) => setData({ ...formData, mobile: e.target.value })}
            focusVisible="none"
          />
          <InputRightAddon
            children={`${formData.mobile.length}/10`}
            bg="none"
            borderLeft="none"
          />
        </InputGroup>
      </Box>
      <Box>
        <FormLabel fontSize="sm">Full Name</FormLabel>
        <InputGroup>
          <Input
            type="text"
            size="xs"
            placeholder="Enter name "
            _focusVisible="none"
            value={formData.name}
            onChange={(e) => setData({ ...formData, name: e.target.value })}
          />
        </InputGroup>
      </Box>
    </Flex>
  );
}
