import React from 'react'
import { ActivityIndicator, View ,Text} from 'react-native'
import { COLORS, FONTS } from '../constants'
import { STYLE } from '../styles'

const Loading = () => {
  return (
    <View style={{...STYLE.screen,...STYLE.center}}>
        <ActivityIndicator size={"large"} color={COLORS.dark} />
        <Text style={{...FONTS.body4,color:COLORS.dark}}>Yükleniyor ... </Text>
    </View>
  )
}

export default Loading