import { graphql } from 'react-apollo'
import LIST_OFFERS from '../queries/offers'
import LIST_NEWS from '../queries/news'
import { LIST_CATEGORIES } from '../queries/categories'

const options = {
    errorPolicy: 'all',
}

export const listOffers = graphql(LIST_OFFERS, {
    options: options,
    props: ({
        data: {
            listOffers = {
                items: []
            }
        }
    }) => ({ offers: listOffers.items })

})

export const listCategories = graphql(LIST_CATEGORIES, {
    options: options,
    props: ({
        data: {
            listCategories = {
                items: []
            }
        }
    }) => ({ categories: listCategories.items })

})

export const listNews = graphql(LIST_NEWS, {
    options: options,
    props: ({
        data: {
            listNews = {
                items: []
            }
        }
    }) => ({ news: listNews.items })

})