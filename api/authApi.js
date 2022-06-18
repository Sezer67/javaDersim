import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const uri = 'http://10.0.2.2:3000/user';

export const createUser = async(data) =>{
    const result = await axios.post(uri,data);
    return result;
}

export const loginUser = async(data) =>{
    const result = await axios.post(`${uri}/login`,data);
    return result;
}

export const getUser = async() =>{
    try{
        const userID = await AsyncStorage.getItem('userID');
        const user = await axios.get(`${uri}/${userID}`);
        return user;
    }catch(err){
        console.log("API GET USER : ",err);
    }
}