import gql from 'graphql-tag'

export const LIST_CATEGORIES = gql(`
  query {
    listCategories(filter: { status: { eq: "active" } }) {
      items {
        name
        image
        title
      }
    }
  }
`)

export const GET_CATEGORY = gql(`
  query($name: String!) {
    getCategory(name: $name) {
      title
    }
  }
`)
