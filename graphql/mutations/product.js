
import gql from 'graphql-tag'

export const UPDATE_PRODUCT = gql(`
    mutation ($input: UpdateProductInput!) {
        updateProduct(input: $input) {
            productId
            category
            upvotes
        }
    }
  `)