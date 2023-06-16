import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Box } from "@chakra-ui/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Box bg="#eff0f5" >
      <ToastContainer />
      <Home />
    </Box>
  );
}

export default App;
