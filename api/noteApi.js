import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';
const uri = 'http://10.0.2.2:3000/note';

export const getAllNotes = async(userId) =>{
    const result = await axios.get(`${uri}/${userId}`);
    return result;
}

export const createNote = async(note) => {
    try{
        const userId = await AsyncStorage.getItem('userID');
        const data = {
            userId,
            title:note.title,
            body:note.body
        }
        console.log(data);
        const result = await axios.post(`${uri}`,data);
        return result;
    }catch(error){
        console.log("API GET USER : ",error);
    }
}

export const deleteNote = async(id) => {
    try{
        const result = await axios.delete(`${uri}/no/${id}`);
        return id;
    }catch(error){
        console.log("API GET USER : ",error);
    }
}

export const updateNote = async(id,data) =>{
    const result = await axios.put(`${uri}/no/${id}`,data);
    return result;
}