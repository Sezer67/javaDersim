import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import {COLORS, FONTS, icons, images} from '../../constants';

import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const Introduction = ({navigation}) => {
  const datas = [
    {
      id: 1,
      image: images.learn,
      title: 'Ne Öğreneceğim ?',
      body: 'Uygulama ile temel Java eğitimi alacaksınız. IDE , Java Maven Kütüphanesi , Algoritma , Collections ve daha fazlası içeride seni bekliyor.',
    },
    {
      id: 2,
      image: images.giris,
      title: 'Nasıl İlerleyeceğim ? ',
      body: 'Ders anlatımlarını sırası ile okuyarak, zaman zaman notlar alarak ve konu bitiminde testleri çözerek ilerleyebilirsin. Unutma ki bu dersler ve testler seni harika bir coder yapmaz. Bilgisayarını açıp kodları kendin de denemelisin.',
    },
    {
      id: 3,
      image: images.introFinish,
      title: 'Bitirince Ne Olacağım ? ',
      body: 'Tüm dersleri ve testleri başarı ile bitirdikten sonra Java temelini atmış ve Java Developer olmaya hak kazanmışsındır.',
    },
  ];

  const _renderItem = ({item}) => {
    return (
      <ScrollView
        key={item.id}
        style={{flex: 1, backgroundColor: COLORS.secondary}}>
        <View style={{marginTop: 0, marginBottom: 50}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={item.image}
              resizeMode="contain"
              style={{width: width - 40 , height: width - 40}}
            />
          </View>

          <Text
            style={{
              color: COLORS.light,
              ...FONTS.h1,
              textAlign: 'center',
              marginTop: 60,
              padding: 10,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: COLORS.light,
              ...FONTS.body3,
              textAlign: 'center',
              marginTop: 40,
              paddingHorizontal: 40,
            }}>
            {item.body}
          </Text>
        </View>
      </ScrollView>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Image
          source={icons.right_arrow}
          resizeMode="contain"
          style={{
            tintColor: COLORS.dark,
            width: 20,
            height: 20,
          }}
        />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Image
          source={icons.check}
          resizeMode="contain"
          style={{
            tintColor: COLORS.dark,
            width: 20,
            height: 20,
          }}
        />
      </View>
    );
  };

  const _onDone = () => {
    navigation.navigate('Login');
  };
  return (
    <AppIntroSlider
      data={datas}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderItem={_renderItem}
      dotStyle={{backgroundColor: COLORS.primary}}
      activeDotStyle={{backgroundColor: 'rgba(0,0,0,0.75)'}}
      showSkipButton={true}
      onDone={_onDone}
    />
  );
};

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Introduction;
