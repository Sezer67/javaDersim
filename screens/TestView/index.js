import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {getTestById} from '../../api/testApi';
import Loading from '../../components/Loading';
import {COLORS, FONTS, images} from '../../constants';
import {STYLE} from '../../styles';
import {Dimensions} from 'react-native';
import UserContext from '../../context/UserContext';
import {updateByUserId} from '../../api/authApi';
import AlertDialog from '../../components/AlertDialog';
import { getNextTestByNo } from '../../api/testApi';

const {width, height} = Dimensions.get('window');

const imgDatas = [
  {
    name: 'test2',
    image: images.test2,
  },{
    name: 'soru3',
    image: images.soru3,
  },{
    name: 'soru10',
    image: images.soru10,
  },{
    name: 'soru9',
    image: images.soru9,
  },{
    name: 'soru17',
    image: images.soru17,
  },{
    name: 'soru20',
    image: images.soru20,
  }
];

const TestView = ({route, navigation}) => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [refresh, setRefresh] = useState(-1);
  const [answer, setAnswer] = useState(null);
  const {completed} = route.params;
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState({});
  const {user,setUser} = useContext(UserContext);
  const handlePress = (item, index) => {
    setSelectedIndex(index);
    if (item === test.answer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const handleNextTest = () => {
    setLoading(true);
    getNextTestByNo(test.no).then(res=>{
      setTest(res.data.test);
      setLoading(false);
      setRefresh(refresh + 1);
    }).catch(error=>{
      setLoading(false);
      setVisible(true);
      
      const err = {
        title: 'HATA',
        status: error.response.data.status,
        message: error.response.data.message,
      };
      setContent(err);
    })
  };

  const _renderItem = ({item, index}) => {
    let option = 'D';
    if (index === 0) option = 'A';
    if (index === 1) option = 'B';
    if (index === 2) option = 'C';
    return (
      <TouchableOpacity
        onPress={() => handlePress(item, index)}
        disabled={completed === "completed" ? true:false}
        style={{
          width: width - 40,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor:
            index === selectedIndex ? COLORS.primary : COLORS.dark,
          borderRadius: 3,
          elevation: 4,
        }}>
        <Text
          style={{
            ...FONTS.body1,
            fontWeight: 'bold',
            color: index === selectedIndex ? COLORS.dark : COLORS.light,
          }}>
          {option} - {' ) '}
        </Text>
        <Text
          style={{
            color: index === selectedIndex ? COLORS.dark : COLORS.light,
            ...FONTS.body2,
            paddingLeft: 5,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const completedFunc = data => {
    
    if (completed === 'completed') {
      for (let i = 0; i < data.options.length; i++) {
        if (data.options[i] === data.answer) setSelectedIndex(i);
      }
    }
  };


  useEffect(() => {
    setLoading(true);
    if(test){
      completedFunc(test);
      setLoading(false);
    }
    else{
      if (route.params.test.question) {
        setTest(route.params.test);
        setLoading(false);
        completedFunc(route.params.test);
      } else {
        getTestById(route.params.test._id)
          .then(res => {
            setTest(res.data.test);
            setLoading(false);
            completedFunc(res.data.test);
          })
          .catch(error => {
            navigation.goBack();
            setLoading(false);
          });
      }
    }
    
  }, [refresh]);

  const handleOkey = () => {
    setLoading(true);
    if (answer) {
      
      updateByUserId({completedTestId: test._id})
        .then(res => {
          setLoading(false);
          setUser(res.data.user);
        })
        .catch(error => console.log(error));
      setLoading(false);
    } else {
      
      updateByUserId({wrongTestId: test._id})
        .then(res => {
          setLoading(false);
          setUser(res.data.user);
        })
        .catch(error => console.log(error));
    }
  };

  if (loading) return <Loading />;

  return (
    <View style={STYLE.screen}>
      {visible && (
        <AlertDialog
          content={content}
          visible={visible}
          setVisible={setVisible}
        />
      )}
      <View style={{margin: 20}}>
        <View style={style.testCard}>
          {test && test.question.image && (
            <Image
              style={{width: '100%', borderRadius: 2}}
              resizeMode="contain"
              source={
                imgDatas.find(img => img.name === test.question.image).image
              }
            />
          )}
          <Text style={{color: COLORS.dark, ...FONTS.body1, marginBottom: 15}}>
            {test && test.no}. {test && test.question.question}
          </Text>
          {test && <FlatList data={test.options} renderItem={_renderItem} />}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={completed === 'completed' ? handleNextTest : handleOkey}
              style={selectedIndex === -1 ? {display: 'none'} : style.btn}>
              <Text
                style={{
                  color: COLORS.dark,
                  ...FONTS.body3,
                  letterSpacing: 1,
                  fontWeight: '700',
                }}>
                {completed === 'completed' ? 'DEVAM ET' : 'ONAYLIYORUM'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  testCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  btn: {
    ...STYLE.secondaryButton,
    backgroundColor: COLORS.light,
    borderRadius: 2,
  },
});

export default TestView;
