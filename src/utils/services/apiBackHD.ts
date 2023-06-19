import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
});

const apiService = {
  getNftMetadata: (id: number) =>
    instance.get<any>(`human-divergence/${id}`).catch((err) => {
      throw new Error("getNftMetadata call failed : " + err);
    }),
  retrieveListNFT: (address: `0x${string}`) =>
    instance.get<number[]>(`api/assets/${address}`).catch((err) => {
      throw new Error("retrieveListNFT call failed : " + err);
    }),
};

export default apiService;
