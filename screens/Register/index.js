import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import login from '../../assets/images/login.png';
import {STYLE} from '../../styles';
import {Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import {icons, images} from '../../constants';
import Input from '../../components/Input';
import {Formik} from 'formik';
import * as yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';
import {createUser} from '../../api/authApi';
import AlertDialog from '../../components/AlertDialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const initialValues = {
  username: '',
  password: '',
  university: '',
};

const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Kullanıcı Adınızı Girmelisiniz.'),
  password: yup.string().required('Parolanızı Girmelisiniz.'),
});

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
const Register = ({navigation}) => {
  const [uni, setUni] = useState('');
  const [visible, setVisible] = useState(false);
  const [content,setContent] = useState({});
  const handleSubmit = async values => {
    //values = {password:str,username:str}
    values.university = uni;
    
    createUser(values)
      .then(async(res) => {
        const result = {
          title:'TEŞEKKÜRLER',
          status:res.data.status,
          message:res.data.message
        };
        setContent(result);
        setVisible(true);
        await AsyncStorage.setItem('userID',res.data.user._id)
        setTimeout(()=>{
          setVisible(false);
          navigation.navigate('Tabs');
        },1000);
      })
      .catch((error) => {
        setVisible(true);
        const err = {
          title:'HATA',
          status:error.response.data.status,
          message:error.response.data.message
        };
        setContent(err);
      });
    //navigation.navigate('Lesson');
  };

  return (
    <View style={{...STYLE.screen, ...STYLE.center}}>
      {visible && <AlertDialog content={content} visible={visible} setVisible={setVisible} />}
      <Image source={images.register} style={style.bgImage} />
      <View style={style.card}>
        <Text
          style={{
            ...FONTS.h2,
            letterSpacing: 3,
            fontWeight: '700',
            color: COLORS.secondary,
            marginBottom: 20,
          }}>
          KAYIT OL
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

              <SelectDropdown
                data={countries}
                onSelect={(item, index) => setUni(item)}
                searchPlaceHolder="Üniversite Adı"
                defaultButtonText="Okuduğun Üniversite"
                buttonTextStyle={{color: COLORS.gray, ...FONTS.body4}}
                dropdownIconPosition={{}}
                renderDropdownIcon={() => (
                  <Image
                    source={icons.down_arrow}
                    style={{width: 16, height: 16, tintColor: COLORS.secondary}}
                  />
                )}
                search={true}
                buttonStyle={style.select}
                dropdownStyle={style.dropdown}
                searchInputStyle={{
                  ...STYLE.input,
                  borderBottomWidth: 1,
                  backgroundColor: COLORS.dark,
                  borderWidth: 0,
                }}
                searchInputTxtColor={COLORS.light}
                rowTextStyle={{color: COLORS.primary}}
                selectedRowStyle={{backgroundColor: COLORS.primary}}
                selectedRowTextStyle={{color: COLORS.dark}}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isValid}
                style={{
                  ...STYLE.secondaryButton,
                  backgroundColor: COLORS.primary,
                }}>
                <Text style={{color: COLORS.dark, ...FONTS.body3}}>
                  KAYIT OL
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  bgImage: {
    position: 'absolute',
    width: width - 50,
    height: width - 50,
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
  dropdown: {
    padding: 5,
    borderBottomEndRadius: 10,
    borderRadius: 10,
    height: 300,
    backgroundColor: COLORS.dark,
    color: COLORS.primary,
  },
  select: {
    width: 250,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: COLORS.light,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});

export default Register;
