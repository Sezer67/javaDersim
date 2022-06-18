import axios from "axios";

const uri = 'http://10.0.2.2:3000/test';

export const getAllTests = async() => {
    const result = await axios.get(uri);
    return result;
}