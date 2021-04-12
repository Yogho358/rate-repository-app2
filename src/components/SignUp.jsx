import React from 'react';
import Text from './Text';
import {StyleSheet,View,Pressable} from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import {useHistory} from 'react-router-native';
import useSignup from '../hooks/useSignup';
import {Formik} from 'formik';
import useSignIn from '../hooks/useSignIn';

const initialValues={
    username:'',
    password:''
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
    username:yup
        .string()
        .required('Username is required')
        .min(1)
        .max(30),
    password:yup
        .string()
        .required('Password is required')
        .min(5)
        .max(50),
    passwordConfirm:yup
        .string()
        .oneOf([yup.ref('password'),null])
        .required('Password confirm is required')
});

const SignUpForm=({onSubmit})=>{
    return (
        <View style={styles.container}>
            <FormikTextInput name='username' placeholder='username'/>
            <FormikTextInput name='password' placeholder='password' secureTextEntry={true}/>
            <FormikTextInput name='passwordConfirm' placeholder='password confirmation' secureTextEntry={true}/>
            <Pressable onPress={onSubmit}>
                <View style={styles.button}>
                <Text style={styles.button}>Sign up</Text>
                </View>
            </Pressable>
        </View>
    );
};

const SignUp=()=>{
    const history=useHistory();
    const [createUser]=useSignup();
    const [signIn]=useSignIn();


    const onSubmit=async (values)=>{
        const{username,password}=values;
        try{
            const {data}=await createUser({
                username:username,
                password:password
            });
        console.log(data);
        
        }catch (e){
            console.log(e);
        }

        try{
            await signIn({username,password});
            
            history.push('/');
            
        }catch(e){
            console.log(e);
        }

    };
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({handleSubmit})=><SignUpForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

export default SignUp;
