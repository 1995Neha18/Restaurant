export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_ORDER_ITEMS":
      return { ...state, orderItems:payload };
    case "ORDER_DECREMENT":
      return { ...state, orderPrice: state.orderPrice - payload };
    case "ORDER_INCREMENT":
      return { ...state, orderPrice: state.orderPrice + payload };
    case "SET_ORDER_PRICE":
      return { ...state, orderPrice: payload };

    default:
      return state;
  }
};
