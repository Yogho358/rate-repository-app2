import useRepository from '../hooks/useRepository';
import {useParams} from 'react-router-native';
import Text from './Text';
import React from 'react';
import RepositoryItem from './RepositoryItem';
import {FlatList,View,StyleSheet} from 'react-native';
import theme from '../theme';
import {format} from 'date-fns';


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
    }

});

const ItemSeparator=()=><View style={styles.separator} />;

const RepositoryInfo=({repository})=>{
    return (
       
        <RepositoryItem item={repository}/>
        
    );
};

const ReviewItem=({review})=>{

    const Grade=()=>{
        return(
        <View>
            <Text style={styles.grade}>{review.rating}</Text>
        </View>
        );
    };
    
    const ReviewMain=()=>{
        return(
            <View style={{flexShrink:1}}>
                <Text style={styles.name}>{review.user.username}</Text>
                <Text>{format(new Date(review.createdAt),'dd.MM.yyyy')}</Text>
                <ItemSeparator/>
                <Text style={styles.text}>{review.text}</Text>
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

const SingleRepository=()=>{
    const {id}=useParams();

    
    
    const repository= useRepository(id);
    
    if(!repository){
        return(
            <Text>loading</Text>
        );
    }

    const reviews=repository.reviews
    ? repository.reviews.edges.map(edge=>edge.node) :[];
   
    console.log(reviews);

    return (
       
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}    
        />
        
    );

};

export default SingleRepository;