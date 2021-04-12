import {useQuery} from '@apollo/client';
import {GET_REPOSITORY} from '../graphql/queries';

const useRepository= (id)=>{
    const {data} = useQuery(GET_REPOSITORY,{variables:{id:id},fetchPolicy:'cache-and-network'});
    
    const repository=data?data.repository:undefined;
    return repository;
};

export default useRepository;