import axios from 'axios';

const url = 'http://localhost:5000/shopdetails';


export const getShopDetails = () => axios.get(url);
export const postShopDetails = (data) => axios.post(url, data);
