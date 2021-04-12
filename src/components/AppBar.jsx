import React from 'react';
import {View,StyleSheet,ScrollView} from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import {useQuery} from '@apollo/client';
import {AUTHORIZED_USER} from '../graphql/queries';
import SignOut from './SignOut';
import CreateReview from './CreateReview';


const styles=StyleSheet.create({
    container:{
        paddingTop:Constants.statusBarHeight,
        display:'flex',        
        backgroundColor:'#24292e',       
    },
    scroll:{
        flexDirection:'row',
        
    },
});


const AppBar=()=>{
    
    const user=useQuery(AUTHORIZED_USER,{fetchPolicy:'cache-and-network'});
    return (
    <View style={styles.container}>
        <ScrollView horizontal style={styles.scroll}>
            <AppBarTab text='Repositories' link='/'/>
            {user.data?.authorizedUser?
            <View style={styles.scroll}>
            <SignOut/>
            <CreateReview/>
            <AppBarTab text='My reviews' link='/reviews'/>
            </View>:
            <View style={styles.scroll}>
            <AppBarTab text='Sign in' link='/signin'/>
            <AppBarTab text='Sign up' link='/signup'/>
            </View>
            }
            
        </ScrollView>
    </View>
    );
};

export default AppBar;