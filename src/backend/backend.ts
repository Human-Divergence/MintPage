import axios from "axios";

const API_URL = "0x686c1D364Fb4Ff4d0cA3F40dEC74E3Ae3cA427ca";
const instance = axios.create({
  baseURL: API_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

export const getSdkPaperKey = async (data: any, address: any) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    return await instance.post(`${API_URL}/assets/${address}`, data, config);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postTransactionStatus = async (transactionId: any) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const data = {
    txId: transactionId,
  };
  try {
    return await instance.post(
      `${API_URL}/transaction-status/${transactionId}/`,
      data,
      config
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTransactionData = async (transactionId: any) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(
      `${API_URL}/transaction-status/${transactionId}/`,
      config
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
