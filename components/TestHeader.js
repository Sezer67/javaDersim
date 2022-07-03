import React from 'react'
import { View,Text } from 'react-native'
import { COLORS, FONTS } from '../constants'
import { STYLE } from '../styles'

const TestHeader = ({title}) => {
  return (
    <View style={[STYLE.center,{elevation:10,backgroundColor:COLORS.light}]}>
        <Text style={{...FONTS.h2}}>{title}</Text>
    </View>
  )
}

export default TestHeader