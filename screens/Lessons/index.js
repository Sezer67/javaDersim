import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {getAllLessons} from '../../api/lessonApi';
import AlertDialog from '../../components/AlertDialog';
import {COLORS, FONTS, icons} from '../../constants';
import {STYLE} from '../../styles';
const {width, height} = Dimensions.get('window');
import Loading from '../../components/Loading'

const _pagination = ({page, setPage , length}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
      }}>
      {page > 0 && (
        <TouchableOpacity
          onPress={() => setPage(page - 1)}
          style={style.arrow_btn}>
          <Image
            source={icons.back_arrow}
            style={{
              width: 24,
              height: 24,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Text style={{...FONTS.body1, color: COLORS.dark}}>{page + 1}</Text>

      {parseInt(length / 7) !== page && (
        <TouchableOpacity
          style={style.arrow_btn}
          onPress={() => setPage(page + 1)}>
          <Image
            source={icons.right_arrow}
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

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
        {item.name}
      </Text>
      <Image source={item.completed ? icons.completed : icons.not_complete} />
    </TouchableOpacity>
  );
};

const Lesson = ({navigation}) => {
  const [page, setPage] = useState(0);
  const [lessons, setLessons] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({});
  //tek listede 7 adet görüntülenecek
  const perPage = 7;
  useEffect(() => {
    setLoading(true);

    getAllLessons()
      .then(res => {
        setLessons(res.data.lessons);
        setLoading(false);
        console.log('THEN : ', res.data);
      })
      .catch(error => {
        console.log('CATCH : ', error);
        const err = {
          title: 'HATA',
          status: error.response.data.status,
          message: error.response.data.message,
        };
        setVisible(true);
        setContent(err);
        setLoading(false);
      });
  }, []);
  if(loading) return <Loading />
  return (
    <View style={STYLE.screen}>
    <StatusBar backgroundColor={COLORS.dark} />
      {visible && (
        <AlertDialog
          visible={visible}
          setVisible={setVisible}
          content={content}
        />
      )}
      <View style={style.topContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.light,
              flex: 0.75,
              fontWeight: '600',
            }}>
            ÇOK İYİ GİDİYORSUN AZ KALDI
          </Text>
          <View style={style.circle}>
            <Text
              style={{...FONTS.h1, color: COLORS.primary, fontWeight: 'bold'}}>
              %85
            </Text>
          </View>
        </View>
        <View style={{...STYLE.center}}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.light,
              fontWeight: '700',
              letterSpacing: 2,
            }}>
            DERSLER
          </Text>
        </View>
      </View>
      <View style={style.listCard}>
        <FlatList
          data={lessons.slice(page * perPage, page * perPage + perPage)}
          ListFooterComponent={() => (
            <_pagination length={lessons.length}  page={page} setPage={setPage} />
          )}
          renderItem={({item})=>(<_renderItem item={item} navigation={navigation} />)}
          keyExtractor={item => item.no.toString()}
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
  circle: {
    width: height / 6,
    height: height / 6,
    borderWidth: 3,
    borderColor: COLORS.secondary,
    borderRadius: height / 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow_btn: {
    width: 32,
    height: 32,
    borderWidth: 1.5,
    borderColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    marginHorizontal: 20,
  },
});

export default Lesson;
