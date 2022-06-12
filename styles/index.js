import {StyleSheet} from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const STYLE = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:COLORS.secondary
    },
    center:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    imageSize:{
        width:(width * 11/12),
        height:(height * 3/12)
    },
    secondaryButton:{
        backgroundColor:COLORS.dark,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:COLORS.light,
        width:(width * 1/2),
        paddingVertical:15,
        elevation:10,
        borderRadius:10
    },input:{
        width:250,
        paddingVertical:8,
        paddingHorizontal:10,
        ...FONTS.body3,
        borderWidth:1,
        borderColor:COLORS.primary,
        borderRadius:5,
        marginBottom:15
      }
})