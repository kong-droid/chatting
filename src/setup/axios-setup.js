import axios from 'axios';
import EnvSetup from "./env-setup.js";

EnvSetup();

const isSecure = process.env.npm_lifecycle_event === "stage" || process.env.npm_lifecycle_event === "prod";

const AxiosSetup = axios.create({
  baseURL: process.env.NODE_ENV_API_URL,
  headers: {
    secure: isSecure
  }
});

export default AxiosSetup;