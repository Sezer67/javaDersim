import axios from "axios";

const uri = 'http://10.0.2.2:3000/lesson';

export const getAllLessons = async() =>{
    const result = await axios.get(uri);
    return result;
}

export const getLessonbyId = async(id) =>{
    const result = await axios.get(`${uri}/${id}`);
    return result;
}