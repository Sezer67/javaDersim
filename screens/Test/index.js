import React, { useEffect, useState } from 'react';
import {View, Text, StatusBar, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image} from 'react-native';
import { getAllTests } from '../../api/testApi';
import Loading from '../../components/Loading';
import {COLORS, FONTS, icons} from '../../constants';
import {STYLE} from '../../styles';

const {width, height} = Dimensions.get('window');


const _renderItem = ({item,navigation}) => {
  //completed kontrol işlemi yapılacak
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('LessonView',{lesson:item})}
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: COLORS.dark,
        marginBottom: 10,
        paddingBottom: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <Text style={{...FONTS.h2, color: COLORS.dark}}>{item.no}</Text>
      <Text
        style={{
          ...FONTS.h2,
          flexGrow: 0.3,
          color: COLORS.dark,
          fontWeight: '600',
        }}>
        {item.question.question.substring(0,25)}
      </Text>
      <Image source={item.completed ? icons.completed : icons.not_complete} />
    </TouchableOpacity>
  );
};


const Test = ({navigation}) => {
  const [tests,setTests] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    getAllTests().then(res=>{
      setLoading(false);
      setTests(res.data.tests);
      console.log('res : ',res.data);
    }).catch(error=>{
      setLoading(false);
      console.log('error',error.response.data.message)
    });
  },[])

  if(loading) return <Loading />;

  return (
    <View style={STYLE.screen}>
      <StatusBar backgroundColor={COLORS.dark} />
      <View style={style.topContainer}>
        <View style={{display: 'flex', flexDirection: 'column',}}>
          <Text
            style={{
              ...FONTS.body1,
              textAlign: 'center',
              color: COLORS.light,
              fontWeight: '700',
              letterSpacing: 2,
            }}>
            İSTATİSTİKLERİN
          </Text>
          <View style={STYLE.center}>
            <View
              style={{
                width: width / 2.5,
                borderBottomColor: COLORS.light,
                borderWidth: 1.5,
              }}
            />
          </View>
          <View style={{display:'flex',marginVertical:10,marginTop:20,flexDirection:'row',alignItems:'center'}}>
              <Text style={style.txtTitle}>Toplam Çözülen Test Sayısı : </Text>
              <Text style={style.txtValue}>15</Text>
          </View>
          
          <View style={{display:'flex',marginVertical:10,flexDirection:'row',alignItems:'center'}}>
              <Text style={style.txtTitle}>Doğru Çözülen Test Sayısı : </Text>
              <Text style={style.txtValue}>8</Text>
          </View>
          
        </View>
      </View>
      <View style={style.listCard}>
        <FlatList 
          data={tests}
          keyExtractor={(item)=>item._id}
          renderItem={({item})=><_renderItem item={item} navigation={navigation} />}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  topContainer: {
    height: height / 3,
    backgroundColor: COLORS.dark,
    width: width,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  txtTitle:{
    ...FONTS.h2,
    color:COLORS.primary,
    fontWeight:'600'
  },txtValue:{
    ...FONTS.body2,
    color:COLORS.primary,
  },
  listCard: {
    position: 'absolute',
    top: height / 4,
    left: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    width: width - 40,
    height: (height * 3) / 4 - 80,
    padding: 20,
    elevation: 6,
    paddingTop: 30,
  },
});

export default Test;
