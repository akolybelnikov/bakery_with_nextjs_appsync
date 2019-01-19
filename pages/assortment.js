import { graphql, Query } from 'react-apollo'
import CategoryWithProducts from '../components/CategoryWithProducts'
import ErrorScreen from '../components/ErrorScreen'
import LoadingScreen from '../components/LoadingScreen'
import { LIST_CATEGORIES } from '../graphql/queries/categories'
import { LIST_PRODUCTS } from '../graphql/queries/products'
import { filterByKey } from '../lib/helpers'
import withData from '../withData'

const Products = ({ products }) => {
  return (
    <Query query={LIST_CATEGORIES}>
      {({ loading, error, data: { listCategories } }) => {
        if (loading) return <LoadingScreen />
        if (error) return <ErrorScreen />
        return (
          <React.Fragment>
            {listCategories.items &&
              listCategories.items.map((category, index) => (
                <CategoryWithProducts
                  key={index}
                  category={category}
                  products={filterByKey(products, category.name).splice(0, 8)}
                />
              ))}
          </React.Fragment>
        )
      }}
    </Query>
  )
}

const ProductsWithData = graphql(LIST_PRODUCTS, {
  options: {
    variables: { limit: 250, status: { eq: 'active' } },
  },
  props: props => ({
    products: props.data.listProducts ? props.data.listProducts.items : [],
  }),
})(Products)

export default withData(ProductsWithData)
