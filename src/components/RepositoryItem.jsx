import React from 'react';
import {View,StyleSheet,Image,Pressable} from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as WebBrowser from 'expo-web-browser';
import {useHistory} from 'react-router-native';



export const numberFormatter=(num)=>{
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
};

const RepositoryItem=({item})=>{

    
    const history=useHistory();
    const styles=StyleSheet.create({
        item:{
            backgroundColor:'white',
            padding:20,
            display:'flex',
            flex:1,
            flexGrow:1,
            
        },
        center:{
            display:'flex',
            flex:1,
            
        },
        language:{
            display:'flex',
            backgroundColor:theme.colors.primary,
            flexGrow:0,
            color:'white',
            justifyContent:'center'
        },
        row:{
            display:'flex',
            flexDirection:'row'
        }
    });

    const Center=()=>{
        
        return (
            <View style={styles.center}>                  
                <Text testID='fullName' fontSize='subheading' fontWeight='bold'>
                    {item.fullName}
                </Text>
                <Text testID='description' color='textSecondary'>
                    {item.description}
                </Text>
                <View style={styles.row}>
                
                    <Text testID='language' style={styles.language}>
                        {item.language}
                    </Text>
                
                </View>
            </View>
        );
    };

    const Img=()=>{
        return ( 
            <View>
                <Image style={{width:30,height:30}} source={{uri:item.ownerAvatarUrl}}/>
            </View>
        );
    };

    const Stars=()=>{
        const starAmount=numberFormatter(item.stargazersCount);
        return(
            <View style={styles.center}>
                <Text testID='starAmount' fontSize='subheading' fontWeight='bold'>{starAmount}</Text>
                <Text color='textSecondary'>Stars</Text>
            </View>
        );
    };

    const Forks=()=>{
        const forkAmount=numberFormatter(item.forksCount);
        return (
            <View style={styles.center}>
                <Text testID='forkAmount' fontSize='subheading' fontWeight='bold'>{forkAmount}</Text>
                <Text color='textSecondary'>Forks</Text>
            </View>
        );
    };

    const Reviews=()=>{
        const reviewAmount=numberFormatter(item.reviewCount);
        return(
            <View style={styles.center}>
                <Text testID='reviewAmount' fontSize='subheading' fontWeight='bold'>{reviewAmount}</Text>
                <Text color='textSecondary'>Reviews</Text>
            </View>
        );
    };

    const Rating=()=>{
        return(
            <View style={styles.center}>
                <Text testID='ratingAverage' fontSize='subheading' fontWeight='bold'>{item.ratingAverage}</Text>
                <Text color='textSecondary'>Rating</Text>
            </View>
        );
    };

    const Url=()=>{
        
        if(item.url===undefined){
            
            return null;
        }

        return (
            <View>
                <Pressable onPress={openUrl}>
                    <Text style={styles.language}>Open in GitHub</Text>
                </Pressable>
            </View>
        );
    };

    const openUrl=()=>{
        WebBrowser.openBrowserAsync(item.url);
    };

    const goToRepository=()=>{
        
        history.push(`/repositories/${item.id}`);
    };

    return(
        <View style={styles.item}>
        <Pressable onPress={goToRepository} style={styles.item}>
        
        <View style={styles.center}>
            <View style={styles.row}>
                <Img/>
                <Center/>
            </View>
            <View style={styles.row}>
                <Stars/>
                <Forks/>
                <Reviews/>
                <Rating/>
            </View>
            <Url/>
        </View>
        
        </Pressable>
        </View>
       
    );
};

export default RepositoryItem;

