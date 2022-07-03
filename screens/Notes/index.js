import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  TextInput,
} from 'react-native-paper';
import {getAllNotes} from '../../api/noteApi';
import {COLORS, FONTS, icons} from '../../constants';
import {STYLE} from '../../styles';
import UserContext from '../../context/UserContext';
import moment from 'moment';
import AddNoteModal from '../../components/AddNoteModal';
import { useFocusEffect } from '@react-navigation/native';
const Notes = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [filternotes, setFilterNotes] = useState([]);
  
  const hideDialog = () => setVisible(false);
  const updateNotes = note => setFilterNotes([...notes, note]);
  const {user} = useContext(UserContext);
  const fetchDatas = () =>{
    getAllNotes(user._id)
      .then(res => {
        setNotes(res.data.notes);
        setFilterNotes(res.data.notes);
      })
      .catch(error => {
        console.log(error);
      });
  }
  useFocusEffect(
    React.useCallback(()=>{
      fetchDatas();
    },[])
  )
  useEffect(() => {
    fetchDatas();
  }, []);
  //FİLTER
  useEffect(()=>{
    const filter = notes.filter((note)=>{
      const a = note.title.toLowerCase().search(search.toLowerCase());
      if(a !== -1)
        return note;
    });
    setFilterNotes(filter);
  },[search])

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('NoteView',{
        note:item
      })} style={style.card}>
        <View>
          <Text style={style.title}>{item.title.toUpperCase().substring(0,10)}</Text>
          <Text style={style.body}>
            {
              item.body.search('\n') !== -1 ? item.body.substring(0, 10) : item.body.substring(0, 18) 
            }
            {item.body.length > 18 && '...'}
          </Text>
        </View>
        <View style={style.dateRow}>
          <Text
            style={{paddingRight: 5, color: COLORS.primary, ...FONTS.body3}}>
            {moment(item.updatedDate).format('ll')}
          </Text>
          <Image
            source={icons.calendar}
            resizeMode="contain"
            style={{tintColor: COLORS.primary,width:24,height:24}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={STYLE.screen}>
      <StatusBar backgroundColor={COLORS.dark} />
      <View
        style={{
          margin: 20,
          elevation: 0.6,
          borderBottomColor: COLORS.primary,
          borderBottomWidth: 1,
          shadowColor: COLORS.primary,
        }}>
        <TextInput
          label="Başlık Ara"
          placeholderTextColor={COLORS.primary}
          underlineColor={COLORS.primary}
          activeUnderlineColor={COLORS.primary}
          mode="flat"
          value={search}
          onChangeText={value => setSearch(value)}
          style={{backgroundColor: 'transparent', color: COLORS.primary}}
        />
      </View>

      <View style={{flex: 1, marginHorizontal: 20}}>
        <FlatList data={filternotes} renderItem={_renderItem} numColumns={2}  />
      </View>
      <TouchableOpacity onPress={() => setVisible(true)} style={style.addBtn}>
        <Image
          source={icons.add}
          style={{width: 28, height: 28, tintColor: COLORS.dark}}
        />
      </TouchableOpacity>
      {visible && (
        <AddNoteModal
          visible={visible}
          updateNotes={updateNotes}
          hideDialog={hideDialog}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    ...FONTS.h1,
    color: COLORS.light,
    fontWeight: '700',
  },
  body: {
    ...FONTS.body2,
    color: COLORS.primary,
    fontWeight: '700',
    paddingLeft: 5,
  },
  dateRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  card: {
    flex: 1,
    margin: 5,
    marginBottom: 10,
    backgroundColor: COLORS.dark,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    padding: 10,
    borderWidth: 0,
    borderColor: COLORS.primary,
    borderRadius: 5,
    height: 150,
    maxHeight:150,
    elevation:5
  },
  addBtn: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});

export default Notes;
