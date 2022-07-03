import React from 'react';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';
import {COLORS, FONTS} from '../constants';
import * as yup from 'yup';
import {Formik} from 'formik';
import {TextInput} from 'react-native';
import {STYLE} from '../styles';
import { createNote } from '../api/noteApi';

const noteValidationSchema = yup.object().shape({
  title: yup.string().required('Başlık Girmelisiniz.'),
  body: yup.string().required('Açıklama Girmelisiniz'),
});

const initialValues = {
  title: '',
  body: '',
};

const AddNoteModal = ({visible, updateNotes,hideDialog}) => {
  const handleSubmit = values => {
    createNote(values).then(res=>{
        updateNotes(res.data.note);
        hideDialog();
    }).catch(error=>{
        console.log(error);
    })
  };

  return (
    <Portal>
      <Formik
        validationSchema={noteValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}>
        {({handleSubmit, errors, handleChange, values}) => (
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title
              style={{
                borderBottomColor: COLORS.dark,
                borderBottomWidth: 1,
                width: '100%',
                marginHorizontal: 0,
                paddingHorizontal: 25,
                paddingBottom: 10,
              }}>
              NOT EKLE
            </Dialog.Title>
            <Dialog.Content
              style={{borderBottomColor: COLORS.dark, borderBottomWidth: 1,height:150,display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
              <>
                <TextInput
                  style={[STYLE.input, {width: '100%', marginBottom: 5}]}
                  value={values.title}
                  onChangeText={handleChange('title')}
                  placeholder="Başlık"
                />
                {errors.title && (
                  <Paragraph
                    style={{...FONTS.body3, color: 'red', marginBottom: 10}}>
                    {errors.title}
                  </Paragraph>
                )}
                <TextInput
                  multiline={true}
                  style={[STYLE.input, {width: '100%', marginBottom: 5}]}
                  value={values.body}
                  onChangeText={handleChange('body')}
                  placeholder="İçerik"
                />
                {errors.body && (
                  <Paragraph
                    style={{...FONTS.body3, color: 'red', marginBottom: 10}}>
                    {errors.body}
                  </Paragraph>
                )}
              </>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode="outlined"
                style={{borderWidth: 1, borderColor: COLORS.secondary}}
                color={COLORS.secondary}
                onPress={handleSubmit}>
                KAYDET
              </Button>
              <Button
                mode="outlined"
                style={{borderWidth: 1, borderColor: 'red', marginLeft: 10}}
                color={'red'}
                onPress={hideDialog}>
                KAPAT
              </Button>
            </Dialog.Actions>
          </Dialog>
        )}
      </Formik>
    </Portal>
  );
};

export default AddNoteModal;
