import { Title } from 'bloomer'
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react'
import ComponentContainer from '../components/ComponentContainer'
import ContactDetails from '../components/ContactDetails'
import mapStyles from '../styles/googlemap'

const style = {
  width: '100%',
  height: '60%',
}

const Contact = props => (
  <ComponentContainer>
    <Title
      style={{ margin: '1rem' }}
      hasTextColor='primary'
      className='is-size-6-mobile is-size-4 has-text-centered-mobile'>
      Наши координаты
    </Title>
    <div className='map-container' style={{ height: '60vh' }}>
      <Map
        styles={mapStyles}
        style={style}
        google={props.google}
        zoom={15}
        scrollwheel={false}
        streetViewControl={false}
        mapTypeControl={false}
        fullscreenControl={false}
        initialCenter={{
          lat: 55.715226,
          lng: 37.797472,
        }}>
        <Marker
          title={'Все Булочки Тут'}
          name={'Все Булочки Тут'}
          position={{ lat: 55.715226, lng: 37.797472 }}
        />
        <Marker />
      </Map>
    </div>
    <ContactDetails />
    <style jsx>
      {`
        :global(.map-container > div > div > div) {
          height: 103% !important;
        }
        :global(main) {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
      `}
    </style>
  </ComponentContainer>
)
export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_ID,
})(Contact)
