import {
  Breadcrumb,
  BreadcrumbItem,
  Column,
  Columns,
  Icon,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardBody,
  ModalCardFooter,
  ModalClose,
  ModalContent,
} from "bloomer"
import Link from "next/link"
import Router, { withRouter } from "next/router"
import { graphql, Query } from "react-apollo"
import ComponentContainer from "../components/ComponentContainer"
import ProductCardDetails from "../components/ProductCardDetails"
import { GET_CATEGORY } from "../graphql/queries/categories"
import { GET_PRODUCT } from "../graphql/queries/products"
import ON_UPDATE_PRODUCT from "../graphql/subscriptions/product"
import { BelowDefault, Default } from "../styles/utils"
import withData from "../withData"

class Product extends React.Component {
  state = {
    isActive: false,
    currentProduct: null,
  }

  subscription

  componentDidMount() {
    this.subscription = this.props.subscribeToVotes()
  }

  componentWillUnmount() {
    this.subscription = null
  }

  onEmptyHeartClick = () => {
    this.setState({ isActive: true })
  }

  render() {
    const { isAuthenticated, email, setProduct, product } = this.props
    return (
      <ComponentContainer>
        <Default>
          <Breadcrumb style={{ paddingLeft: "20px" }}>
            <ul>
              <BreadcrumbItem>
                <Link href="/">
                  <a>В начало</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                {product && (
                  <Query
                    query={GET_CATEGORY}
                    variables={{ name: product.category }}>
                    {({ data: { getCategory } }) => {
                      if (getCategory) {
                        return (
                          <Link
                            href={{
                              pathname: "/category",
                              query: {
                                name: product.category,
                              },
                            }}>
                            <a>{getCategory.title}</a>
                          </Link>
                        )
                      } else return null
                    }}
                  </Query>
                )}
              </BreadcrumbItem>
              <BreadcrumbItem isActive>
                <a>{product && product.productName}</a>
              </BreadcrumbItem>
            </ul>
          </Breadcrumb>
        </Default>
        <BelowDefault>
          <Icon
            className="fas fa-chevron-left has-text-primary"
            style={{ padding: "2rem" }}
            onClick={() => Router.back()}
          />
        </BelowDefault>
        <Columns>
          <Column
            isSize={{ mobile: 12, tablet: 6, default: 4 }}
            isOffset={{ default: 2, tablet: 3 }}>
            <ProductCardDetails
              onEmptyHeartClick={this.onEmptyHeartClick}
              isAuthenticated={isAuthenticated}
              product={product}
              email={email}
            />
          </Column>
        </Columns>
        <Modal isActive={this.state.isActive}>
          <ModalBackground onClick={() => this.setState({ isActive: false })} />
          <ModalContent>
            <ModalCard>
              <ModalCardBody className="has-text-centered">
                Войдите в приложение, чтобы сохранить продукт
              </ModalCardBody>
              <ModalCardFooter style={{ justifyContent: "center" }}>
                <Link href="/authenticate">
                  <a
                    className="button is-primary"
                    onClick={() => setProduct(product)}>
                    <span>Вход пользователя</span>
                    <Icon className="fas fa-chevron-right" />
                  </a>
                </Link>
              </ModalCardFooter>
            </ModalCard>
          </ModalContent>
          <ModalClose onClick={() => this.setState({ isActive: false })} />
        </Modal>
        <style jsx>
          {`
            @media screen and (max-width: 768px) {
              :global(.modal-card) {
                max-width: 90%;
              }
            }
            @media screen and (max-width: 1087px) {
              :global(.breadcrumb) {
                margin-top: 2rem;
              }
            }
          `}
        </style>
      </ComponentContainer>
    )
  }
}

const ProductWithQuery = graphql(GET_PRODUCT, {
  options: props => ({
    variables: {
      productId: props.router.query.id,
      category: props.router.query.category,
    },
  }),
  props: props => {
    if (props) {
      return {
        product: props.data.getProduct ? props.data.getProduct : null,
        subscribeToVotes: () => {
          if (props.data.getProduct) {
            return props.data.subscribeToMore({
              document: ON_UPDATE_PRODUCT,
              variables: {
                productId: props.data.getProduct.productId,
                category: props.data.getProduct.category,
              },
              updateQuery: (
                prev,
                {
                  subscriptionData: {
                    data: { onUpdateProduct },
                  },
                },
              ) => {
                const res = {
                  ...prev,
                  getProduct: {
                    ...prev.getProduct,
                    upvotes: onUpdateProduct.upvotes,
                  },
                }
                return res
              },
            })
          }
        },
      }
    }
  },
})(Product)

const ProductWithRouter = withRouter(ProductWithQuery)

export default withData(ProductWithRouter)
