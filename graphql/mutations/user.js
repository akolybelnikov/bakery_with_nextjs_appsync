import gql from 'graphql-tag'

export const CREATE_USER = gql(`
    mutation ($input: CreateUserInput!) {
        createUser(input: $input) {
            email
        }
    }
  `)

export const UPDATE_USER = gql(`
    mutation ($input: UpdateUserInput!) {
        updateUser(input: $input) {
            email
            firstname
            lastname
            dob
            telephone
            votes
            avatar
            lastActive
        }
    }
  `)
