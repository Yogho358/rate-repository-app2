import {useMutation,useApolloClient} from '@apollo/client';

import {CREATE_REVIEW} from '../graphql/mutations';


const useCreateReview=()=>{
    const apolloClient=useApolloClient();
   
    const [mutate,result]=useMutation(CREATE_REVIEW);

    
    const createReview=async (values)=>{
       
        const res=await mutate({variables:{input:values}});
        apolloClient.resetStore();

        return res;
    };
    return [createReview,result];
};

export default useCreateReview;