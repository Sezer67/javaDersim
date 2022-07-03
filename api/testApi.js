import axios from "axios";

const uri = 'http://10.0.2.2:3000/test';

export const getAllTests = async() => {
    const result = await axios.get(uri);
    return result;
}

export const getTestById = async(id) =>{
    const result = await axios.get(`${uri}/${id}`);
    return result;
}
export const getNextTestByNo = async(no)=>{
    const result = await axios.get(`${uri}/next/${no}`);
    return result;
}