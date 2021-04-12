import React from 'react';
import {View,StyleSheet,Pressable} from 'react-native';
import Text from './Text';
import {useApolloClient} from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import {useHistory} from 'react-router-native';


const styles=StyleSheet.create({
    container:{
        paddingRight:20
    }
});



const SignOut=()=>{

    const authStorage=useAuthStorage();
    const apolloClient=useApolloClient();
    const history=useHistory();

    const onPress= async ()=>{
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        history.push('/');
    };

    return(
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <Text color='primary'>Sign Out</Text>
                </Pressable>
            
            </View>
    );
};

export default SignOut;