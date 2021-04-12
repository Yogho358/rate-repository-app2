import {gql} from '@apollo/client';
export const SIGN_IN=gql`
    mutation authorize($credentials:AuthorizeInput!){
        authorize(credentials:$credentials){
            accessToken
        }
    }
`;

export const CREATE_REVIEW=gql`
    mutation createReview($input:CreateReviewInput){
        createReview(review:$input){
            id
            user{
                username
                id
            }
            userId
            repositoryId
            rating
            createdAt
            text
        }
    }
`;

export const CREATE_USER=gql`
    mutation signUp($input:CreateUserInput){
        createUser(user:$input){
            id
            username
        }
    }
`;

export const DELETE_REVIEW=gql`
    mutation deleteReview($id:ID!){
        deleteReview(id:$id)
            
        
    }
`;


