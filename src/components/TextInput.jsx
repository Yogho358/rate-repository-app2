import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    textInput:{
        padding:10,
        borderWidth:1,
        borderRadius:5
    },
    error:{
        padding:10,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#d73a4a'
    }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style,styles.textInput];
    if(error){
        return <NativeTextInput style={styles.error} {...props} />;
    }
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;