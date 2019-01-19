import graphql from 'graphql-tag';

const LIST_NEWS = graphql(`
  query {
    listNews(filter: { status: { eq: "active" } }) {
      items {
        id
        content
        image
        createdAt
        status
      }
    }
  }
`)

export default LIST_NEWS
