import axios from "axios";

axios.defaults.baseURL = process.env.API_URL || "https://escoffier-cardapio-digital.onrender.com/";
export default axios 