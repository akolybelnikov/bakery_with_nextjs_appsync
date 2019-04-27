import { Auth } from 'aws-amplify'
import { Title } from 'bloomer'
import { Button } from 'bloomer/lib/elements/Button'
import { Container } from 'bloomer/lib/layout/Container'
import Link from 'next/link'
import Router from 'next/router'
import { Query } from 'react-apollo'
import ComponentContainer from '../components/ComponentContainer'
import ErrorScreen from '../components/ErrorScreen'
import VotesList from '../components/VotesList'
import { LIST_PRODUCTS } from '../graphql/queries/products'
import GET_USER from '../graphql/queries/user'
import { findVotes } from '../lib/helpers'
import withData from '../withData'

const User = ({ isAuthenticated, email, setCurrentUser }) => {
  const signOut = () => {
    Auth.signOut()
      .then(() => {
        setCurrentUser(null, false)

        Router.push({
          pathname: '/authenticate',
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <ComponentContainer>
      {isAuthenticated && email ? (
        <Query query={GET_USER} variables={{ email: email }}>
          {({ error, data: { getUser } }) => {
            if (error) {
              console.error(error)
              return <ErrorScreen />
            }
            if (getUser && getUser.votes && getUser.votes.length) {
              console.log(getUser)
              return (
                <React.Fragment>
                  <Title
                    style={{ textAlign: 'center', padding: '2rem 0' }}
                    hasTextColor='primary'
                    className='is-size-6-mobile is-size-4 has-text-centered-mobile'>
                    Вам недавно нравилось:
                  </Title>
                  <Query
                    query={LIST_PRODUCTS}
                    variables={{
                      limit: 250,
                      filter: {
                        status: { eq: 'active' },
                      },
                    }}>
                    {({ error, data: { listProducts } }) => {
                      if (error) {
                        console.error(error)
                        return <ErrorScreen />
                      }
                      if (listProducts) {
                        return (
                          <VotesList
                            votes={findVotes(getUser.votes, listProducts.items).splice(0, 10)}
                          />
                        )
                      } else {
                        return null
                      }
                    }}
                  </Query>
                  <Container
                    style={{ textAlign: 'center', paddingBlockStart: '2rem' }}>
                    <Button isOutlined isColor='primary' onClick={signOut}>
                      Выйдти из сайта
                    </Button>
                  </Container>
                </React.Fragment>
              )
            } else {
              return <p>no votes</p>
            }
          }}
        </Query>
      ) : (
        <Container
          style={{
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Link
            href={{
              pathname: '/authenticate',
            }}>
            <Button isOutlined isColor='primary'>
              Войти как зарегистрированный пользователь
            </Button>
          </Link>
        </Container>
      )}
    </ComponentContainer>
  )
}

export default withData(User)
