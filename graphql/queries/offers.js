import gql from 'graphql-tag'

const LIST_OFFERS = gql(`
    query {
        listOffers (filter: {status: {eq: "active"}}) {
            items {
                id
                content
                image
                status
            }
        }
    }
`)

export default LIST_OFFERS