import React from 'react';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import {StyleSheet,View,Pressable} from 'react-native';
import FormikTextInput from './FormikTextInput';
import {Formik} from 'formik';
import useCreateReview from '../hooks/useCreateReview';
import {useHistory} from 'react-router-native';

const initialValues={
    ownerName:'',
    repositoryName:'',
    rating:'',
    text:''
};


const styles=StyleSheet.create({
    container:{
        padding:5
    },
    button:{
        textAlign:'center',
        backgroundColor:theme.colors.primary,
        color:'white'

    }
});

const validationSchema=yup.object().shape({
    ownerName:yup
        .string()
        .required('Repository owner name is required'),
    repositoryName:yup
        .string()
        .required('Repository name is required required'),
    rating:yup
        .number()
        .required('Rating is required')
        .min(0)
        .max(100)
});

const ReviewForm=({onSubmit})=>{
    return(
        <View style={styles.container}>
            <FormikTextInput name='ownerName' placeholder='Repository owner name'/>
            <FormikTextInput name='repositoryName' placeholder='Repository name' />
            <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
            <FormikTextInput name='text' placeholder='Review'/>
            <Pressable onPress={onSubmit}>
                <View style={styles.button}>
                <Text style={styles.button}>Create a review</Text>
                </View>
            </Pressable>
        </View>
    );
};

const CreateReviewForm=()=>{
    const history=useHistory();

    const [createReview]=useCreateReview();

    const onSubmit=async (values)=>{
        const {ownerName,repositoryName,rating,text}=values;
        
        try{
            const {data}=await createReview({
                repositoryName,
                ownerName:ownerName,
                rating:Number(rating),
                text:text
            });
            const review=data.createReview;

            history.push(`/repositories/${review.repositoryId}`);

        }catch (e){
            console.log(e);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({handleSubmit})=><ReviewForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

export default CreateReviewForm;