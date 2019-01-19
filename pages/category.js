import { Column, Columns, Title } from "bloomer"
import Link from "next/link"
import { withRouter } from "next/router"
import { Query } from "react-apollo"
import LazyLoad from "react-lazy-load"
import ComponentContainer from "../components/ComponentContainer"
import ErrorScreen from "../components/ErrorScreen"
import LoadingScreen from "../components/LoadingScreen"
import ProductItem from "../components/Product"
import SearchBar from "../components/SearchBar"
import { GET_CATEGORY } from "../graphql/queries/categories"
import { LIST_PRODUCTS } from "../graphql/queries/products"
import { filterByKey } from "../lib/helpers"
import { BelowDefault, Default } from "../styles/utils"
import withData from "../withData"

const Category = withRouter(({ router }) => {
  return (
    <ComponentContainer>
      <SearchBar />
      <Query query={GET_CATEGORY} variables={{ name: router.query.name }}>
        {({ error, data: { getCategory } }) => {
          if (error) {
            console.error(error)
            return <ErrorScreen />
          }
          if (getCategory) {
            return (
              <React.Fragment>
                <Title
                  style={{ marginLeft: "10px" }}
                  hasTextColor="primary"
                  className="is-size-6-mobile is-size-4 has-text-centered-mobile">
                  {getCategory.title}
                </Title>
                <Query
                  query={LIST_PRODUCTS}
                  variables={{
                    limit: 250,
                    filter: {
                      status: { eq: "active" },
                    },
                  }}>
                  {({ loading, error, data: { listProducts } }) => {
                    if (loading) {
                      return <LoadingScreen />
                    }
                    if (error) return <ErrorScreen />
                    if (listProducts) {
                      return (
                        <React.Fragment>
                          <BelowDefault>
                            {listProducts &&
                              filterByKey(
                                listProducts.items,
                                router.query.name,
                              ).map((item, index) => (
                                <LazyLoad
                                  key={index}
                                  height={100}
                                  offsetBottom={400}>
                                  <Link
                                    href={{
                                      pathname: "/product",
                                      query: {
                                        category: item.category,
                                        id: item.productId,
                                      },
                                    }}>
                                    <a>
                                      <ProductItem product={item} />
                                    </a>
                                  </Link>
                                </LazyLoad>
                              ))}
                          </BelowDefault>
                          <Default>
                            <Columns
                              style={{ padding: "0 10px" }}
                              isMobile
                              isMultiline>
                              {listProducts &&
                                filterByKey(
                                  listProducts.items,
                                  router.query.name,
                                ).map((item, index) => (
                                  <Column
                                    key={index}
                                    isSize={{
                                      mobile: 6,
                                      tablet: 4,
                                      desktop: 3,
                                    }}>
                                    <Link
                                      href={{
                                        pathname: "/product",
                                        query: {
                                          category: item.category,
                                          id: item.productId,
                                        },
                                      }}>
                                      <a>
                                        <ProductItem product={item} />
                                      </a>
                                    </Link>
                                  </Column>
                                ))}
                            </Columns>
                          </Default>
                        </React.Fragment>
                      )
                    } else {
                      return null
                    }
                  }}
                </Query>
              </React.Fragment>
            )
          } else {
            return null
          }
        }}
      </Query>
    </ComponentContainer>
  )
})

export default withData(Category)
