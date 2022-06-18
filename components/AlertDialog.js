import React from 'react'
import { Image, View } from 'react-native'
import { Dialog, Paragraph, Portal } from 'react-native-paper'
import { COLORS, FONTS, icons } from '../constants'

const AlertDialog = ({visible,setVisible,content}) => {
  return (
    <Portal>
        <Dialog style={{opacity:.95,backgroundColor:COLORS.light,elevation:12}} visible={visible} onDismiss={()=>setVisible(false)}>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:20}}>
                <Image source={content.status === "error" ? icons.error : icons.success} style={{
                    width:32,
                    height:32
                }} />
                <Dialog.Title >{content.title}</Dialog.Title>
            </View>
            <Dialog.Content>
                <Paragraph style={{...FONTS.body2}}>{content.message}</Paragraph>
            </Dialog.Content>
        </Dialog>
    </Portal>
  )
}

export default AlertDialog