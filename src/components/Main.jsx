import React from 'react';
import {StyleSheet,View} from 'react-native';
import {Route,Switch,Redirect} from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReviewForm from './CreateReviewForm';
import SignUp from './SignUp';
import Reviews from './Reviews';


const styles=StyleSheet.create({
    constainer: {
        flexGrow:1,
        flexShrink:1,
        backgroundColor:'#e1e4e8'
    },
});

const Main = () => {
    return(
        <View style={styles.constainer}>
            <AppBar/>
            <Switch>
                <Route path='/reviews' exact>
                    <Reviews/>
                </Route>
                <Route path='/signup' exact>
                    <SignUp/>
                </Route>
                <Route path='/reviews/create' exact>
                    <CreateReviewForm/>
                </Route>
                <Route path='/repositories/:id' exact>
                    <SingleRepository/>
                </Route>
                <Route path='/signin' exact>
                    <SignIn />
                </Route>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Redirect to='/'/>
            </Switch>
        </View>
    );
};

export default Main;