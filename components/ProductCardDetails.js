import {
  Card,
  CardContent,
  CardFooter,
  CardFooterItem,
  CardImage,
  Icon,
  Subtitle,
  Tag,
} from 'bloomer'
import { CardHeader } from 'bloomer/lib/components/Card/Header/CardHeader'
import { Mutation, Query } from 'react-apollo'
import { UPDATE_PRODUCT } from '../graphql/mutations/product'
import { UPDATE_USER } from '../graphql/mutations/user'
import GET_USER from '../graphql/queries/user'
import { filterByValue } from '../lib/helpers'
import { BelowDefault, Default, theme } from '../styles/utils'
import Image from './Image'
import { EmptyHeart, FilledHeart } from './SVG/Heart'

const withMutation = Component => {
  return function MutationHOC(props) {
    return (
      <Mutation mutation={UPDATE_PRODUCT}>
        {(mutate, state) => (
          <Component
            {...props}
            mutate={mutate}
            loading={state.loading}
            mutationError={state.error}
          />
        )}
      </Mutation>
    )
  }
}

const Details = ({
  product,
  isAuthenticated,
  onEmptyHeartClick,
  email,
  mutate,
}) => {
  return (
    <Card className='fadeIn'>
      <CardHeader style={{ padding: '1rem 0' }}>
        <Subtitle style={{ margin: '0 auto' }} className='has-text-primary'>
          {product && product.productName}
        </Subtitle>
      </CardHeader>
      <CardImage>
        <figure className='image is-square'>
          <BelowDefault>
            {product && product.image && (
              <Image
                style={{ minWidth: '100%' }}
                size='600x600'
                name={product.image}
                alt='product image'
              />
            )}
          </BelowDefault>
          <Default>
            {product && product.image && (
              <Image
                style={{ minWidth: '100%' }}
                size='1200x1200'
                name={product.image}
                alt='product image'
              />
            )}
          </Default>
        </figure>
      </CardImage>
      <CardContent className='has-text-centered'>
        <p className='product-paragraph is-size-5-tablet is-size-6-mobile'>
          {product && product.content}
        </p>
        <p className='product-paragraph is-size-6-tablet is-size-7-mobile'>
          {product && product.ingridients && product.ingridients}
        </p>
        {product && product.sorts && (
          <div className='product-paragraph has-text-left'>
            <span className='has-text-primary'>Начинки: </span>
            {product.sorts.map((sort, index) => (
              <Tag key={index} style={{ margin: '0.3rem' }} isColor='success'>
                {sort}
              </Tag>
            ))}
          </div>
        )}
        <p
          className='has-text-primary'
          style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <span>Вес: {product && product.weight && product.weight}</span>
          <span>Цена: {product && product.price && product.price} руб.</span>
        </p>
      </CardContent>
      <CardFooter>
        <CardFooterItem>
          <span style={{ marginRight: '10px' }}>
            {product && product.upvotes && product.upvotes}
          </span>
          {!isAuthenticated && (
            <a aria-label='like button' onClick={onEmptyHeartClick}>
              <EmptyHeart fill={theme.primary} />
            </a>
          )}
          {isAuthenticated && email && (
            <Query query={GET_USER} variables={{ email: email }}>
              {({ data: { getUser }, error }) => {
                if (error) console.error(error)
                if (getUser) {
                  return (
                    <Mutation mutation={UPDATE_USER}>
                      {updateUser => (
                        <React.Fragment>
                          {getUser &&
                            getUser.votes &&
                            getUser.votes.length &&
                            getUser.votes.includes(product.productId) && (
                              <a
                                aria-label='like button'
                                onClick={() => {
                                  updateUser({
                                    variables: {
                                      input: {
                                        email: email,
                                        votes: filterByValue(
                                          getUser.votes,
                                          product.productId,
                                        ),
                                      },
                                    },
                                  })
                                  mutate({
                                    variables: {
                                      input: {
                                        productId: product.productId,
                                        category: product.category,
                                        upvotes: product.upvotes
                                          ? product.upvotes - 1
                                          : 0,
                                      },
                                    },
                                  })
                                }}>
                                <FilledHeart fill={theme.primary} />
                              </a>
                            )}
                          {(!getUser ||
                            !getUser.votes ||
                            !getUser.votes.length) && (
                            <a
                              aria-label='like button'
                              onClick={() => {
                                updateUser({
                                  variables: {
                                    input: {
                                      email: email,
                                      votes: [...[product.productId]],
                                    },
                                  },
                                })
                                mutate({
                                  variables: {
                                    input: {
                                      productId: product.productId,
                                      category: product.category,
                                      upvotes: product.upvotes
                                        ? product.upvotes + 1
                                        : 1,
                                    },
                                  },
                                })
                              }}>
                              <EmptyHeart fill={theme.primary} />
                            </a>
                          )}
                          {!getUser.votes.includes(product.productId) && (
                            <a
                              aria-label='like button'
                              onClick={() => {
                                updateUser({
                                  variables: {
                                    input: {
                                      email: email,
                                      votes: [
                                        ...getUser.votes,
                                        ...[product.productId],
                                      ],
                                    },
                                  },
                                })
                                mutate({
                                  variables: {
                                    input: {
                                      productId: product.productId,
                                      category: product.category,
                                      upvotes: product.upvotes
                                        ? product.upvotes + 1
                                        : 1,
                                    },
                                  },
                                })
                              }}>
                              <EmptyHeart fill={theme.primary} />
                            </a>
                          )}
                        </React.Fragment>
                      )}
                    </Mutation>
                  )
                } else {
                  return null
                }
              }}
            </Query>
          )}
        </CardFooterItem>
        <CardFooterItem>
          <a
            className='button is-primary'
            href='tel:+79266298726'
            target='_self'
            aria-label='telephone number'>
            <span>Заказать</span>
            <Icon className='fas fa-phone' />
          </a>
        </CardFooterItem>
      </CardFooter>
      <style jsx>{`
        :global(img.media-image) {
          left: 50%;
          top: 50%;
          position: absolute;
          transform: translate(-50%, -50%);
        }
        @-webkit-keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        :global(.card.fadeIn) {
          -webkit-animation-name: fadeIn;
          animation-name: fadeIn;
          animation-duration: 0.6s;
        }
        .product-paragraph {
          margin-bottom: 15px;
          text-align: justify;
          text-justify: inter-word;
        }
      `}</style>
    </Card>
  )
}

export default withMutation(Details)
