import axios from "axios";

const API_URL = "https://back.humandivergence.com";

const instance = axios.create({
  baseURL: API_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

export const getSdkPaperKey = async (data: any) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    return await instance.post(`${API_URL}/checkout/`, data, config);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTransactionStatus = async (transactionId: any) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    return await instance.get(
      `${API_URL}/transaction-status/${transactionId}/`,
      config
    );
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
