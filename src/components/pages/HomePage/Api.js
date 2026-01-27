import axios from "axios";
import CryptoJS from "crypto-js";

const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;
const PROJECT_URL = "http://localhost/ink-shade-react/";
const API_URL = PROJECT_URL + "wp-json/wc/v3";

// Function to generate OAuth signature
const generateOAuthSignature = (url, method = "GET", params = {}) => {
  const nonce = Math.random().toString(36).substring(2);
  const timestamp = Math.floor(Date.now() / 1000);

  const oauthParams = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp,
    oauth_version: "1.0",
  };

  const allParams = { ...oauthParams, ...params };

  const paramString = Object.keys(allParams)
    .sort()
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`
    )
    .join("&");

  const baseUrl = url.split("?")[0]; // Ensure no query params in the base URL
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(
    baseUrl
  )}&${encodeURIComponent(paramString)}`;
  const signingKey = `${encodeURIComponent(CONSUMER_SECRET)}&`;

  const signature = CryptoJS.HmacSHA1(baseString, signingKey).toString(
    CryptoJS.enc.Base64
  );

  return { ...oauthParams, oauth_signature: encodeURIComponent(signature) };
};

const api = axios.create({
  baseURL: API_URL,
});

// Get all Products from WooCommerce Store
export const getAllProducts = async () => {
  try {
    const url = `${API_URL}/products`;
    const oauthParams = generateOAuthSignature(url);
    const response = await api.get("/products", {
      params: oauthParams,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllCategories = async () => {
  try {
    const url = `${API_URL}/products/categories`;
    const oauthParams = generateOAuthSignature(url);
    const response = await api.get("/products/categories", {
      params: oauthParams,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// Read Single Product Data by ID
export const getSingleProductData = async (productID) => {
  try {
    const url = `${API_URL}/products/${productID}`;
    const oauthParams = generateOAuthSignature(url);
    const response = await api.get(`/products/${productID}`, {
      params: oauthParams,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Create an Order in WooCommerce
export const createAnOrder = async (userInfo) => {
  try {
    // @ts-ignore
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Check cart items
    if (!cartItems.length) {
      console.log("Cart is empty");
      return false;
    }

    const lineItems = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const data = {
      ...userInfo,
      line_items: lineItems,
    };

    const url = `${API_URL}/orders`;

    const oauthParams = generateOAuthSignature(url, "POST");

    // Generate Oauth Header
    const oauthHeader = Object.keys(oauthParams)
      .map((key) => `${key}=${encodeURIComponent(oauthParams[key])}`)
      .join(", ");

    const response = await api.post("/orders", data, {
      headers: {
        Authorization: `OAuth ${oauthHeader}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Fetch all Orders by User Id
export const getOrdersByUserId = async (userid) => {
  try {
    const url = `${API_URL}/orders`;

    const oauthParams = generateOAuthSignature(url, "GET", {
      customer: userid,
    });

    const response = await api.get("/orders", {
      params: {
        ...oauthParams,
        customer: userid,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Get Single Order Data
export const getSingleOrderData = async (orderId) => {
  try {
    const url = `${API_URL}/orders/${orderId}`;

    const oauthParams = generateOAuthSignature(url);

    const response = await api.get(`/orders/${orderId}`, {
      params: oauthParams,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
