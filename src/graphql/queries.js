import {gql} from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query repositories(
        $orderBy:AllRepositoriesOrderBy,
        $orderDirection:OrderDirection,
        $searchKeyword:String
        $first:Int,
        $after:String
        ){
        repositories(orderBy:$orderBy,orderDirection:$orderDirection,searchKeyword:$searchKeyword,first:$first,after:$after){
        edges {
            node {
              id
              ownerAvatarUrl
              fullName
              description
              language
              stargazersCount
              forksCount
              reviewCount
              ratingAverage
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            
            hasNextPage
          }
        totalCount
        }
      }
    `;

export const AUTHORIZED_USER=gql`
    query getAuthorizedUser($includeReviews:Boolean=false){
        authorizedUser{
            id
            username
            reviews @include(if:$includeReviews){
                edges{
                    node{
                        id
                        repositoryId
                        rating
                        createdAt
                        text
                        repository{
                            fullName
                        }
                    }
                }
            }      
        }
    }
`;

export const GET_REPOSITORY=gql`
    query repository($id:ID! $first:Int,$after:String){
        repository(id:$id){
            id,
            fullName,
            description,
            language,
            ownerAvatarUrl,
            stargazersCount,
            reviewCount,
            ratingAverage,
            forksCount,
            url,
            reviews(first:$first,after:$after){
                edges{
                    node{
                        id
                        text
                        rating
                        createdAt
                        user{
                            id
                            username
                        }
                    }
                    cursor
                }
            totalCount
            pageInfo{
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
            }
            }
        }
        
    }
`;