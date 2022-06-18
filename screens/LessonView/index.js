import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getLessonbyId} from '../../api/lessonApi';
import Loading from '../../components/Loading';
import {COLORS, FONTS, icons, images} from '../../constants';
import {Paragraph} from 'react-native-paper';
import {STYLE} from '../../styles';

const {width, height} = Dimensions.get('window');

const imgDatas = [
  {
    name: 'ders1comment1',
    image: images.ders1comment1,
  },
  {
    name: 'ders1comment2',
    image: images.ders1comment2,
  },
  {
    name: 'ders1comment3',
    image: images.ders1comment3,
  },
  {
    name: 'ders2degiskenler1',
    image: images.ders2degiskenler1,
  },
  {
    name: 'ders2types1',
    image: images.ders2types1,
  },
  {
    name: 'operators1',
    image: images.operators1,
  },
  {
    name: 'operators2',
    image: images.operators2,
  },
  {
    name: 'operators3',
    image: images.operators3,
  },
  {
    name: 'operators4',
    image: images.operators4,
  },
];

const _renderItem = ({item}) => {
  return (
    <View style={style.subjectContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1.5, backgroundColor: COLORS.primary}} />
        <View>
          <Text
            style={{
              paddingHorizontal: 15,
              textAlign: 'center',
              color: COLORS.primary,
              ...FONTS.h1,
              textTransform: 'uppercase',
            }}>
            {item.title}
          </Text>
        </View>
        <View style={{flex: 1, height: 1.5, backgroundColor: COLORS.primary}} />
      </View>
      <View>
        <Paragraph style={{color: COLORS.dark, ...FONTS.body2}}>
          {'    '}
          {item.body}
        </Paragraph>
        {item.image && (
          <View style={{elevation: 5, width: width - 40}}>
            <Image
              source={imgDatas.find(img => img.name === item.image).image}
              style={{width: '100%', borderRadius: 2}}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const LessonView = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState({});

  const _footer = () => {
    return (
      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginBottom:15}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{width:'auto',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Image 
              source={icons.completed}
              style={{width:40,height:40,marginLeft:5,tintColor:COLORS.primary}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{...STYLE.secondaryButton,width:'auto',paddingHorizontal:25,backgroundColor:COLORS.primary,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:COLORS.dark,...FONTS.body3}}>Teste Geç</Text>
          <Image 
              source={icons.right_arrow}
              style={{width:20,height:20,marginLeft:5}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    setLoading(true);
    getLessonbyId(route.params.lesson._id)
      .then(res => {
        setLesson(res.data.lesson);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.response.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <View style={STYLE.screen}>
      <StatusBar backgroundColor={COLORS.dark} />
      <FlatList
        style={{marginVertical: 20}}
        data={lesson.body}
        keyExtractor={item => item._id}
        renderItem={_renderItem}
        ListFooterComponent={_footer}
      />
    </View>
  );
};

const style = StyleSheet.create({
  subjectContainer: {
    paddingHorizontal: 20,
  },
});

export default LessonView;
