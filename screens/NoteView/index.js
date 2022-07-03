import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { updateNote } from '../../api/noteApi';
import { COLORS, FONTS, icons } from '../../constants';
import { STYLE } from '../../styles';

const NoteView = ({route,navigation}) => {
    const [note,setNote] = useState(route.params.note);
    const [title,setTitle] = useState(note.title);
    const [body,setBody] = useState(note.body);

    const handleOK = () =>{
        updateNote(note._id,{title,body}).then(res=>{
            setNote(res.data.note);
        }).catch(error=>{
            console.log(error);
        })
    }

    return (
    <View style={[STYLE.screen,{padding:20,paddingBottom:0}]}>
        <View style={style.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image 
                    source={icons.back_arrow}
                    style={{
                        width:24,
                        height:24,
                        tintColor:COLORS.dark
                    }}
                    resizeMode="contain"

                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOK}>
                <Image 
                    source={icons.check}
                    style={{
                        width:24,
                        height:24,
                        tintColor:COLORS.dark
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
        <View>
            <TextInput 
                value={title}
                onChangeText={(val)=>setTitle(val)}
                placeholder="BAŞLIK"
                style={{backgroundColor:'transparent',...FONTS.body1,color:COLORS.dark,fontWeight:'700'}}
            />
        </View>
        <ScrollView>
            <TextInput 
                multiline={true}
                value={body}
                onChangeText={(val)=>setBody(val)}
                style={{backgroundColor:'transparent',...FONTS.h2,color:COLORS.dark}}
            />
        </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
    header:{
        width:'100%',
        height:50,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})

export default NoteView