import { baseUrl, fetchApi } from "./fetchApi";

export const getPropertyListForSale = () =>
  fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
export const getPropertyListForRent = () =>
  fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );
