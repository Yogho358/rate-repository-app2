import {useMutation,useApolloClient} from '@apollo/client';
import {SIGN_IN} from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn=()=>{
    const authStorage=useAuthStorage();
    const apolloClient=useApolloClient();
    const [mutate,result]=useMutation(SIGN_IN);

    const signIn=async ({username,password})=>{

        const res=await mutate({variables:{credentials:{username,password}}});       
        await authStorage.setAccessToken(res.data.authorize.accessToken);
        apolloClient.resetStore();
            
        return res;
    };

    return [signIn,result];
};

export default useSignIn;


