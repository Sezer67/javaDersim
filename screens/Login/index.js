import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import login from '../../assets/images/login.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STYLE} from '../../styles';
import {Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import {Formik} from 'formik';
import * as yup from 'yup';
import {getUser, loginUser} from '../../api/authApi';
import AlertDialog from '../../components/AlertDialog';
import Loading from '../../components/Loading';
import UserContext from '../../context/UserContext';
const {width, height} = Dimensions.get('window');
const initialValues = {
  username: '',
  password: '',
};

const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Kullanıcı Adınızı Girmelisiniz.'),
  password: yup.string().required('Parolanızı Girmelisiniz.'),
});

const Login = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState({});
  const [loading,setLoading] = useState(false);

  const {user,setUser} = useContext(UserContext);

  const authUser = async() =>{
    setLoading(true);
    try{
      const userId = await AsyncStorage.getItem('userID');
      if(userId){
        getUser().then(res=>{
          setUser(res.data.user);
        }).catch(error=>{
          console.log(error);
        })
        navigation.navigate('Tabs');
      }
      setLoading(false);
    }catch(err){
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(()=>{
    authUser();
  },[])
  

  const handleSubmit = values => {
    //values = {password:str,username:str}
    loginUser(values)
      .then(async res => {
        const result = {
          title: 'HOŞGELDİNİZ',
          status: res.data.status,
          message: res.data.message,
        };
        setContent(result);
        setVisible(true);
        await AsyncStorage.setItem('userID', res.data.user._id);
        setUser(res.data.user);
        setTimeout(() => {
          setVisible(false);
          navigation.navigate('Tabs');
        }, 1000);
      })
      .catch(error => {
        setVisible(true);
        const err = {
          title: 'HATA',
          status: error.response.data.status,
          message: error.response.data.message,
        };
        setContent(err);
      });
  };

  if(loading) return <Loading />

  return (
    <View style={{...STYLE.screen, ...STYLE.center}}>
      {visible && (
        <AlertDialog
          content={content}
          visible={visible}
          setVisible={setVisible}
        />
      )}
      <Image source={login} style={style.bgImage} />
      <View style={style.card}>
        <Text
          style={{
            ...FONTS.h2,
            letterSpacing: 3,
            fontWeight: '700',
            color: COLORS.secondary,
            marginBottom: 20,
          }}>
          GİRİŞ YAP
        </Text>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginValidationSchema}>
          {({
            handleSubmit,
            errors,
            isValid,
            handleBlur,
            handleChange,
            values,
          }) => (
            <>
              <TextInput
                style={STYLE.input}
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder="Kullanıcı Adı"
              />
              {errors.username && (
                <Text style={{...FONTS.body4, color: 'red', marginBottom: 10}}>
                  {errors.username}
                </Text>
              )}
              <TextInput
                style={STYLE.input}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                placeholder="Şifre"
              />
              {errors.password && (
                <Text style={{...FONTS.body4, color: 'red', marginBottom: 10}}>
                  {errors.password}
                </Text>
              )}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isValid}
                style={{
                  ...STYLE.secondaryButton,
                  backgroundColor: COLORS.primary,
                }}>
                <Text style={{color: COLORS.dark, ...FONTS.body3}}>GİRİŞ</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{marginTop: 20}}>
          <Text
            style={{
              ...FONTS.body4,
              textDecorationLine: 'underline',
              color: COLORS.dark,
            }}>
            Henüz Bir Hesabım Yok
          </Text>
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
    marginTop: 30,
    backgroundColor: COLORS.light,
    maxWidth: width,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 300,
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 30,
    padding: 20,
    paddingVertical: 30,
  },
});

export default Login;
