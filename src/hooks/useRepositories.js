
import {useQuery} from '@apollo/client';
import {GET_REPOSITORIES} from '../graphql/queries';

const useRepositories=({variables})=>{
    

    /*const variables={
        ...sort,
        searchKeyword:search,
        first:2
    };*/
    //console.log(variables);
    
    const {data,loading,fetchMore, ...result}=useQuery(GET_REPOSITORIES,{
        variables,
        fetchPolicy:'cache-and-network',
        });
    
    const handleFetchMore=()=>{
        
        const canFetchMore =  data?.repositories.pageInfo.hasNextPage;
        console.log(loading);

        if(!canFetchMore){
            console.log('pois');
            return;
        }

        fetchMore({
            variables:{
                after:data.repositories.pageInfo.endCursor,
                ...variables,
            },
        });
    };
    
    
    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        ...result,
      };
};

export default useRepositories;


