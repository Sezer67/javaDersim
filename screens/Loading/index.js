import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, images} from '../../constants';
import {STYLE} from '../../styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import LoadingC from '../../components/Loading'
const Loading = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const goIntroduction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Introduction');
    }, 750);
  };

  const goLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
    }, 750);
  };

  if(loading)
    return <LoadingC />

  return (
    <View
      style={{
        ...STYLE.screen,
        ...STYLE.center,
      }}>
      <Image
        source={images.giris}
        style={{
          width: width + 50,
          height: (height * 2) / 5,
          marginBottom: (width * 1) / 3,
        }}
      />
      <View style={{}}>
        <TouchableOpacity
          onPress={goLogin}
          style={{...STYLE.secondaryButton, marginBottom: 20}}>
          <Text style={{...FONTS.body3, color: COLORS.light}}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goIntroduction}
          style={{...STYLE.secondaryButton}}>
          <Text style={{...FONTS.body3, color: COLORS.light}}>
            Tanıtıma Göz At
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Loading;
