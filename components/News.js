import { Title, Container } from 'bloomer'
import Slider from 'react-slick'
import { Default, BelowDefault, theme } from '../styles/utils'
import NewsItem from '../components/NewsItem'

const defaultSettings = {
  arrows: true,
  infinite: true,
  swipeToSlide: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  dots: true,
  className: 'news-slider',
  // vertical: true,
  // verticalSwiping: true,
}

const belowDefaultSettings = {
  dots: true,
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '60px',
  slidesToShow: 3,
  speed: 500,
  cssEase: 'ease-in-out',
  swipeToSlide: true,
}

export default ({ news }) => {
  return (
    <React.Fragment>
      <Container>
        <Title
          style={{ margin: '1rem' }}
          hasTextColor='primary'
          className='is-size-6-mobile is-size-4 has-text-centered-mobile'>
          Все наши новости
        </Title>
        <Default>
          <Slider {...defaultSettings}>
            {news &&
              news.map((item, index) => (
                <div className='element' key={index} style={{ height: '70vh' }}>
                  <NewsItem news={item} />
                </div>
              ))}
          </Slider>
        </Default>
      </Container>
      <style jsx>{`
        :global(.slick-dots li button:before) {
          font-size: 10px;
          color: ${theme.primary};
        }
        :global(.slick-dots li.slick-active button:before) {
          color: ${theme.primary};
        }
      `}</style>
    </React.Fragment>
  )
}
