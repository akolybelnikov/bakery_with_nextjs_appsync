import gql from 'graphql-tag'

export default gql(`
    subscription onUpdateProduct($productId: ID!, $category: String!) {
        onUpdateProduct(productId: $productId, category: $category) {
            upvotes
        }
    }
`)