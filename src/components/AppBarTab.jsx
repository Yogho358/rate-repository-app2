import React from 'react';
import {View,StyleSheet} from 'react-native';
import {Link} from 'react-router-native';
import Text from './Text';

const styles=StyleSheet.create({
    container:{
        paddingRight:20
    }
});

const AppBarTab=({text,link})=>{
    return(
        <View style={styles.container}>
            <Link to={link}>
                <Text color='primary'>{text}</Text>
            </Link>
            
            </View>
    );
};

export default AppBarTab;