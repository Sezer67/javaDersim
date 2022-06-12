import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import login from '../../assets/images/login.png';
import {STYLE} from '../../styles';
import {Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import Input from '../../components/Input';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
const {width, height} = Dimensions.get('window');

const initialValues = {
  username: '',
  password: '',
};

const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Kullanıcı Adınızı Girmelisiniz.'),
  password: yup
    .string()
    .required('Parolanızı Girmelisiniz.')
});

const Login = ({navigation}) => {
  const handleSubmit = (values) => {
    //values = {password:str,username:str}
  };

  return (
    <View style={{...STYLE.screen, ...STYLE.center}}>
      <Image source={login} style={style.bgImage} />
      <View style={style.card}>
        <Text style={{...FONTS.h2,letterSpacing:3,fontWeight:'700',color:COLORS.secondary,marginBottom:20}}>GİRİŞ YAP</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginValidationSchema}>
          {({handleSubmit,errors,isValid,handleBlur,handleChange,values}) => (
            <>
              <TextInput 
                style={STYLE.input}
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder="Kullanıcı Adı"
              />
              {errors.username && <Text style={{...FONTS.body4,color:'red',marginBottom:10}}>{errors.username}</Text>}
              <TextInput 
                style={STYLE.input}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                placeholder='Şifre'
              />
              {errors.password && <Text style={{...FONTS.body4,color:'red',marginBottom:10}}>{errors.password}</Text>}
              <TouchableOpacity onPress={handleSubmit} disabled={!isValid} style={{...STYLE.secondaryButton,backgroundColor:COLORS.primary}}>
                <Text style={{color:COLORS.dark,...FONTS.body3}}>GİRİŞ</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <TouchableOpacity onPress={()=>navigation.navigate('Register')} style={{marginTop:20}}>
          <Text style={{...FONTS.body4,textDecorationLine:'underline',color:COLORS.dark}}>Henüz Bir Hesabım Yok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  bgImage: {
    position: 'absolute',
    width: width,
    height: width,
    bottom: height - height / 1.9,
  },
  card: {
    marginTop:30,
    backgroundColor: COLORS.light,
    maxWidth: width,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    minWidth: 300,
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 30,
    padding: 20,
    paddingVertical:30,
  },
});

export default Login;
