import {useMutation,useApolloClient} from '@apollo/client';
import {CREATE_USER} from '../graphql/mutations';

const useSignUp=()=>{
    const apolloClient=useApolloClient();
    const [mutate,result]=useMutation(CREATE_USER);

    const createUser=async (values)=>{
        const res=await mutate({variables:{input:values}});
        apolloClient.resetStore;

        return res;
    };
    return [createUser,result];

};

export default useSignUp;