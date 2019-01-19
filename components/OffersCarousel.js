import { Default, Handset, SmallHandset } from '../styles/utils'
import { Carousel, CarouselItem, CarouselTitle } from './Carousel'
import Image from './Image'

const OffersCarousel = ({ offers }) => {
  return (
    <Carousel autoplay='true' delay='10000'>
      {offers.length &&
        offers.map((offer, index) => (
          <CarouselItem key={index}>
            <CarouselTitle>{offer.content}</CarouselTitle>
            {offer.image && (
              <React.Fragment>
                <SmallHandset>
                  <Image
                    style={{ minWidth: '100%' }}
                    className='is-background'
                    size='640x640'
                    name={offer.image}
                    alt='offer image'
                  />
                </SmallHandset>
                <Handset>
                  <Image
                    style={{ minWidth: '100%' }}
                    className='is-background'
                    size='980x980'
                    name={offer.image}
                    alt='offer image'
                  />
                </Handset>
                <Default>
                  <Image
                    style={{ minWidth: '100%' }}
                    className='is-background'
                    size='1440x1440'
                    name={offer.image}
                    alt='offer image'
                  />
                </Default>
              </React.Fragment>
            )}
          </CarouselItem>
        ))}
    </Carousel>
  )
}

export default OffersCarousel
