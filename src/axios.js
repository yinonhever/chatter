import axios from "axios";

export const baseURL = "https://chatter-bbq.herokuapp.com";

export default axios.create({ baseURL });