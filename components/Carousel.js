import Slider from 'react-slick'
import {
  GTLargeHandset,
  Handset,
  LargeHandset,
  SmallHandset,
  theme,
} from '../styles/utils'
import Item from './CarouselItem'
import ItemTitle from './ItemTitle'

const settings = {
  dots: true,
  fade: true,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 5000,
  cssEase: 'linear',
}

export default ({ items }) => {
  return (
    <div>
      <Slider {...settings}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <SmallHandset>
              <Item name={item.image} size={'450x450'}>
                <ItemTitle
                  content={item.content}
                  fontSize={'1rem'}
                  lineHeight={1.3}
                />
              </Item>
            </SmallHandset>
            <Handset>
              <Item name={item.image} size={'600x600'}>
                <ItemTitle
                  content={item.content}
                  fontSize={'1.1rem'}
                  lineHeight={1.3}
                />
              </Item>
            </Handset>
            <LargeHandset>
              <Item name={item.image} size={'750x750'}>
                <ItemTitle
                  content={item.content}
                  fontSize={'1.5rem'}
                  lineHeight={1.5}
                />
              </Item>
            </LargeHandset>
            <GTLargeHandset>
              <Item name={item.image} size={'1440x1440'}>
                <ItemTitle
                  content={item.content}
                  fontSize={'1.5rem'}
                  lineHeight={1.5}
                />
              </Item>
            </GTLargeHandset>
          </React.Fragment>
        ))}
      </Slider>
      <style jsx>{`
        :global(.slick-dots li button:before) {
          font-size: 10px;
          color: ${theme.primary};
        }
        :global(.slick-dots li.slick-active button:before) {
          color: ${theme.primary};
        }
        :global(.slick-slider) {
          min-height: 40vh;
        }
      `}</style>
    </div>
  )
}
