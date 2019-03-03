import { Title } from 'bloomer'
import { Query } from 'react-apollo'
import ComponentContainer from '../components/ComponentContainer'
import ErrorScreen from '../components/ErrorScreen'
import OffersList from '../components/OffersList'
import LIST_OFFERS from '../graphql/queries/offers'
import { BelowDefault, Default } from '../styles/utils'
import withData from '../withData'

const Offers = () => {
  return (
    <ComponentContainer>
      <Query query={LIST_OFFERS}>
        {({ error, data: { listOffers } }) => {
          if (error) {
            console.error(error)
            return <ErrorScreen />
          }
          if (listOffers) {
            return (
              <React.Fragment>
                <Title
                  style={{ textAlign: 'center', padding: '2rem 0' }}
                  hasTextColor='primary'
                  className='is-size-6-mobile is-size-4 has-text-centered-mobile'>
                  Все наши предложения
                </Title>
                <Default>
                  <OffersList items={listOffers.items} height='200' />
                </Default>
                <BelowDefault>
                  <OffersList items={listOffers.items} height='450' />
                </BelowDefault>
              </React.Fragment>
            )
          } else {
            return null
          }
        }}
      </Query>
    </ComponentContainer>
  )
}

export default withData(Offers)
