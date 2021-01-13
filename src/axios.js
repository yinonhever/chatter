import axios from "axios";

export const baseURL = `${window.location.protocol}//${window.location.hostname}:5000`;

export default axios.create({ baseURL });