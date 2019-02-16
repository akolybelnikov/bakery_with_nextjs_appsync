import { Level, LevelItem, Notification } from 'bloomer'
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react'
import ComponentContainer from '../components/ComponentContainer'
import mapStyles from '../styles/googlemap'
import { Touch, theme } from '../styles/utils'

const style = {
  width: '100%',
  height: '50%',
}

const Contact = props => (
  <ComponentContainer>
    <div className='map-container' style={{ height: '50vh' }}>
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
    <Touch>
      <Level className='contact-level' style={{ marginBlockStart: '1rem' }}>
        <LevelItem style={{ flexBasis: '30%' }}>
          <Notification className='has-text-left footer-note'>
            <p>
              <strong>Наш адрес:</strong>
            </p>
            <br />
            <p>109377, г.Москва</p>
            <p>Рязанский проспект, 58/1</p>
          </Notification>
        </LevelItem>
        <LevelItem style={{ flexBasis: '30%' }}>
          <Notification className='has-text-left footer-note'>
            <p>
              <strong>Наши номера телефона:</strong>
            </p>
            <br />
            <p>+7 (926) 982-35-72</p>
            <p>+7 (926) 629-87-26</p>
          </Notification>
        </LevelItem>
        <LevelItem style={{ flexBasis: '40%' }}>
          <Notification className='has-text-left footer-note'>
            <p>
              <strong>Наши часы работы:</strong>
            </p>
            <br />
            <p>с понедельника по субботу: с 8.00 до 20.00</p>
            <br />
            <p>в воскресенье: с 9.00 до 18.00</p>
          </Notification>
        </LevelItem>
      </Level>
    </Touch>
    <style jsx>
      {`
        :global(.map-container > div > div > div) {
          height: 104% !important;
        }
        :global(main) {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        :global(.contact-level) {
          background-color: ${theme.success};
        }
        :global(.notification) {
          min-height: 200px;
        }
        @media screen and (max-width: 767px) {
          :global(.notification) {
            min-height: 100px;
            width: 100%
          }
        }
      `}
    </style>
  </ComponentContainer>
)
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyd63zmYaD4BTRzVjWym2BjY5wX61W6nI',
})(Contact)
