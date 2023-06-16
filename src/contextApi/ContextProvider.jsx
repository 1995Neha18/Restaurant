import React from "react";
import { reducer } from "./reducer";

export const Context = React.createContext();

const initialState = {
  orderItems: {},
  orderPrice: 0,
  initial:[],
};
const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
