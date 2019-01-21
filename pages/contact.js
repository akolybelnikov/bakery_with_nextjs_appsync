import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import ComponentContainer from '../components/ComponentContainer'
import mapStyles from '../styles/googlemap'

const style = {
  width: '100%',
  height: '50%',
}

const Contact = props => (
  <ComponentContainer>
    <div style={{ height: '50vh' }}>
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
  </ComponentContainer>
)
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyd63zmYaD4BTRzVjWym2BjY5wX61W6nI',
})(Contact)
