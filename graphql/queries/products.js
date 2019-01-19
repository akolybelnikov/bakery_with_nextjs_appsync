import gql from 'graphql-tag'

export const LIST_PRODUCTS = gql(`
    query listProducts(
        $filter: TableProductFilterInput,
        $limit: Int
      ) {
        listProducts (filter: $filter, limit: $limit) {
            items {
                productId
                category
                image
                weight
                price
                sorts
                upvotes
                comments
                productName
                content
                ingridients
                status
            }
        }
    }
`)

export const GET_PRODUCT = gql(`
    query getProduct($productId: ID!, $category: String!) {
        getProduct(productId: $productId, category: $category) {
            productId
            category
            image
            weight
            price
            sorts
            upvotes
            comments
            productName
            content
            ingridients
            status
        }
    }
`)
