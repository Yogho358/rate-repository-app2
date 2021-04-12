import React from 'react';
import {Pressable, View,StyleSheet} from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import {Formik} from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import {useHistory} from 'react-router-native';



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
        .required('username required'),
    password:yup
        .string()
        .required('password required')
});

const SignInForm=({onSubmit})=>{
    return(
        <View style={styles.container}>
            <FormikTextInput  name='username' placeholder='username' testID='usernameField'/>
            <FormikTextInput  name='password' placeholder='password' secureTextEntry={true} testID='passwordField'/>
            <Pressable onPress={onSubmit} testID='submit'>
                <View style={styles.button}>
                <Text style={styles.button}>Sign in</Text>
                </View>
            </Pressable>
        </View>
    );
};

export const SignInContainer=({onSubmit})=>{

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({handleSubmit})=><SignInForm onSubmit={handleSubmit}/>}
        </Formik>
    );
};

const SignIn=()=>{

    const [signIn]=useSignIn();
    const history=useHistory();
    
    const onSubmit=async (values)=>{
        
        const {username,password}=values;
        
        
        try{
            await signIn({username,password});
            
            history.push('/');
            
        }catch(e){
            console.log(e);
        }

    };
    return (
        <SignInContainer onSubmit={onSubmit}/>
    );

};

export default SignIn;