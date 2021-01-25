import axios from "axios";

export const baseURL =
    process.env.NODE_ENV === "production" ?
        "https://chatter-bbq.herokuapp.com" :
        "http://localhost:5000";

export default axios.create({ baseURL });