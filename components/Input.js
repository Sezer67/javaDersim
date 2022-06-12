import React from 'react'
import { StyleSheet, TextInput } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

const Input = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props
  const hasError = errors[name] && touched[name]
  return (
    <>
      <TextInput
        style={[
          style.input,
          hasError && style.errorInput
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  )
}

const style = StyleSheet.create({
  input:{
    width:250,
    paddingVertical:8,
    paddingHorizontal:10,
    ...FONTS.body3,
    borderWidth:1,
    borderColor:COLORS.dark,
    borderRadius:5,
    marginBottom:20
  },errorInput: {
    borderColor: 'red',
  }
})

export default Input;
