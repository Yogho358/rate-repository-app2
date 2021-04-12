import React from 'react';
import {View,StyleSheet,Pressable} from 'react-native';
import Text from './Text';
import {useHistory} from 'react-router-native';


const styles=StyleSheet.create({
    container:{
        paddingRight:20
    }
});



const CreateReview=()=>{

    
    const history=useHistory();

    const onPress= async ()=>{
        
        history.push('/reviews/create');
    };

    return(
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <Text color='primary'>Create a Review</Text>
                </Pressable>
            
            </View>
    );
};

export default CreateReview;