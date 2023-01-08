import axios from "axios";
import { ListPropertiesResponse } from "../pages/types";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url: string) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": "656ab78edemsh60cf516e8a9cf76p1b70d3jsn393d7bea4523",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });

  return data;
};
