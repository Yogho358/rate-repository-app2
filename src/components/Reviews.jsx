import React from 'react';
import Text from './Text';
import useUser from '../hooks/useUser';
import {View,FlatList,StyleSheet,Pressable,Alert} from 'react-native';
import theme from '../theme';
import {format} from 'date-fns';
import {useHistory} from 'react-router-native';
import useDelete from '../hooks/useDelete';

const Reviews=()=>{


    const styles=StyleSheet.create({
        separator:{
            height:10,
        },
        review:{
            backgroundColor:'white',
            display:'flex',
            flexShrink:1,
            flexWrap:'wrap',
        },
        grade:{
            width:50,
            height:50,
            borderRadius:50/2,
            borderColor:theme.colors.primary,
            borderWidth:2,
            color:theme.colors.primary,
            fontWeight:'bold',
            alignItems:'center',
            justifyContent:'center',
            display:'flex'
        },
        row:{
            flexDirection:'row'
        },
        name:{
            fontWeight:'bold',    
        },
        text:{
            flexWrap:'wrap',
            flexShrink:1
        },
        language:{
            display:'flex',
            backgroundColor:theme.colors.primary,
            flexGrow:0,
            color:'white',
            justifyContent:'center',
            paddingRight:30
        },
    
    });

    const ItemSeparator=()=><View style={styles.separator} />;

    const ReviewItem=({review,refetch})=>{

        const history=useHistory();
        const[delReview]=useDelete();
        const Grade=()=>{
            return(
            <View>
                <Text style={styles.grade}>{review.rating}</Text>
            </View>
            );
        };

        const viewReview=()=>{
            history.push(`/repositories/${review.repositoryId}`);
        };

        const del=()=>{
            const id=review.id;
            delReview({id});
            console.log(refetch);
            refetch();
        };

        const deleteReview=()=>{
            
            
            Alert.alert(
                "Delete review",
                "Do you really want to delete?",
                [
                    {
                        text:'cancel',
                        onPress:()=>console.log('cancelled'),
                        style:'cancel'
                    },
                    {
                        text:'yes',
                        onPress:()=>{del();
                                }
                    }
                ]
            );
            console.log('delete');
            
        };

        const Buttons=()=>{

            return(
            <View style={styles.row}>
                <Pressable onPress={viewReview}>
                    <Text style={styles.language}>View Repository</Text>
                </Pressable>
                <Pressable onPress={deleteReview}>
                    <Text style={styles.language}>Delete review</Text>
                </Pressable>

            </View>
            );
        };
        
        const ReviewMain=()=>{
            return(
                <View style={{flexShrink:1}}>
                    <Text style={styles.name}>{review.repository.fullName}</Text>
                    <Text>{format(new Date(review.createdAt),'dd.MM.yyyy')}</Text>
                    <ItemSeparator/>
                    <Text style={styles.text}>{review.text}</Text>
                    <ItemSeparator/>
                    <Buttons/>
                </View>
            );
        };
    
        return(
            <View style={styles.review}>
                <View style={styles.row}>
                <Grade/>
                <ReviewMain/>
                </View> 
            </View>
        );
    
    };

    const res=useUser({reviews:true});
    console.log(res);
    
    
    
    if(!res.data){
        return(
            <Text>loading</Text>
        );
    }
    
    const user=res.data.authorizedUser;
    const refetch=res.refetch;
    console.log(refetch);
    
    
    const reviews=user
    ? user.reviews.edges.map(edge=>edge.node) :[];

    //console.log(reviews);

    return (
       
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
            keyExtractor={({ id }) => id}               
        />
        
    );
};

export default Reviews;