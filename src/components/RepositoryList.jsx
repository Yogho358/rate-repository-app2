import React,{useState} from 'react';
import {FlatList,View,StyleSheet} from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import {Button,Menu,Provider,Searchbar} from 'react-native-paper';
import {useDebounce} from 'use-debounce';



const styles=StyleSheet.create({
    separator:{
        height:10,
    },
});



const ItemSeparator=()=><View style={styles.separator} />;

export class RepositoryListContainer extends React.Component{

  

  

  

  SortSelector=()=>{

    const {sort,setSort,searchQuery,setSearchQuery}=this.props;

    let text='';
  if(sort.orderBy==='CREATED_AT'){
    text='Latest';
  }
  if(sort.orderBy==='RATING_AVERAGE'&&sort.orderDirection==='ASC'){
    text='Lowest to highest score';
  }
  if(sort.orderBy==='RATING_AVERAGE'&&sort.orderDirection==='DESC'){
    text='Highest to lowest score';
  }

    const[visible,setVisible]=useState('false');
    const openMenu=()=>setVisible(true);
    const closeMenu=()=>setVisible(false);
   

    const onChangeSearch=query=>setSearchQuery(query);

    const latest=()=>{
      setSort({orderBy:'CREATED_AT',orderDirection:'DESC'});
    };

    const highest=()=>{
      setSort({orderBy:'RATING_AVERAGE',orderDirection:'DESC'});
    };

    const lowest=()=>{
      setSort({orderBy:'RATING_AVERAGE',orderDirection:'ASC'});
    };

    return(

      <View>

      <Searchbar
        placeholder='search'
        onChangeText={onChangeSearch}
        value={searchQuery}
        />
      
      <Provider>
        <View style={{
          paddingTop:10,
          paddingBottom:200,
          flexDirection:'row',
          justifyContent:'center'
        }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Sorting criteria {text}, click to change</Button>}>
              <Menu.Item onPress={latest} title='Latest'/>
              <Menu.Item onPress={highest} title='Highest to lowest score'/>
              <Menu.Item onPress={lowest} title='Lowest to highest score'/>
            </Menu>
        </View>
      </Provider>
      </View>
    );

  };

  render(){
    const {repositories,}=this.props;

     const repositoryNodes=repositories
    ? repositories.edges.map(edge=>edge.node) :[];
    

    

      return(
        
          <FlatList
            
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) =>             
              <RepositoryItem item={item} />
            }
            ListHeaderComponent={this.SortSelector}
            keyExtractor={item=>item.id}
            //onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
            />
                   
      );
          }
  }



const RepositoryList=()=>{
  const [sort,setSort]=useState({orderBy:'CREATED_AT',orderDirection:'DESC'});
  const [searchQuery,setSearchQuery]=useState('');
  const [search]=useDebounce(searchQuery,500);

  const variables={
    ...sort,
    searchKeyword:search,
    
  };

  const {repositories}=useRepositories({variables});

  

  return <RepositoryListContainer  searchQuery={searchQuery} setSearchQuery={setSearchQuery} repositories={repositories} sort={sort} setSort={setSort}/>;
};
  
    

  export default RepositoryList;