import { BASE_URL } from "../utils";
import axios from "axios";

const categoryApi = axios.create({
  baseURL: BASE_URL,
});

export const getAllPrducts = async () => {
  try {
    return await categoryApi.get("/categories");
  } catch (error) {
    return error.message;
  }
};
