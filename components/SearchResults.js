import { Column, Columns, Notification } from "bloomer"
import Fuse from "fuse.js"
import Link from "next/link"
import { graphql } from "react-apollo"
import LazyLoad from "react-lazy-load"
import ProductItem from "../components/Product"
import { LIST_PRODUCTS } from "../graphql/queries/products"
import { BelowDefault, Default } from "../styles/utils"

const Search = ({ term, products }) => {
  let searchItems = []
  const options = {
    shouldSort: true,
    includeMatches: true,
    minMatchCharLength: 5,
    threshold: 0.4,
    location: 0,
    distance: 1000,
    keys: ["productName", "content", "sorts"],
  }

  const fuse = new Fuse(products, options)
  const results = fuse.search(term)

  if (results.length) {
    for (let result of results) {
      if (result.matches.length) {
        searchItems = [...searchItems, ...[result.item]]
      }
    }
  }

  if (searchItems.length) {
    return (
      <React.Fragment>
        <BelowDefault>
          {searchItems.map((item, index) => (
            <LazyLoad key={index} height={100} offsetVertical={200}>
              <Link
                href={{
                  pathname: "/product",
                  query: { category: item.category, id: item.productId },
                }}>
                <a>
                  <ProductItem product={item} />
                </a>
              </Link>
            </LazyLoad>
          ))}
        </BelowDefault>
        <Default>
          <Columns style={{ padding: "0 10px" }} isMobile isMultiline>
            {searchItems.map((item, index) => (
              <Column key={index} isSize={{ mobile: 6, tablet: 4, desktop: 3 }}>
                <Link
                  href={{
                    pathname: "/product",
                    query: { category: item.category, id: item.productId },
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
    return (
      <div className="message-container">
        <Notification className="empty-search has-text-centered">
          Наименований не найдено. Попробуйте изменить условия поиска.
        </Notification>
        <style jsx>
          {`
            .message-container {
              min-height: 55vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            @media all and (max-width: 599px) {
              :global(.empty-search) {
                margin: 1rem;
              }
            }
            @media all and (min-width: 600px) {
              :global(.empty-search) {
                margin: 1rem 0;
              }
            }
          `}
        </style>
      </div>
    )
  }
}

const SearchResults = graphql(LIST_PRODUCTS, {
  options: {
    variables: { limit: 250, status: { eq: "active" } },
  },
  props: props => ({
    products: props.data.listProducts ? props.data.listProducts.items : [],
  }),
})(Search)

export default SearchResults
