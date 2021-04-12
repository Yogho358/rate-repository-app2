import {useQuery} from '@apollo/client';
import {AUTHORIZED_USER} from '../graphql/queries';

const useUser=({reviews})=>{

    const res=useQuery(AUTHORIZED_USER,{fetchPolicy:'cache-and-network',variables:{includeReviews:reviews}});

    //const user=data?data.authorizedUser:undefined;
    
    return res;
};

export default useUser;