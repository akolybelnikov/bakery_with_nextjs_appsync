import { Title } from 'bloomer'
import { compose } from 'react-apollo'
import Categories from '../components/Categories'
import ComponentContainer from '../components/ComponentContainer'
import NewsItem from '../components/NewsItem'
import Carousel from '../components/Carousel'
import {
  listCategories,
  listNews,
  listOffers,
} from '../graphql/resolvers/index'
import '../node_modules/slick-carousel/slick/slick-theme.css'
import '../node_modules/slick-carousel/slick/slick.css'
import withData from '../withData'

const Index = ({ offers, news, categories }) => {

  return (
    <ComponentContainer>
      {offers && <Carousel items={offers} />}
      {categories && <Categories categories={categories} />}
      <Title
        style={{ margin: '1rem' }}
        hasTextColor='primary'
        className='is-size-5-mobile is-size-3 has-text-centered-mobile'>
        Наши новости
      </Title>
      {news && (
        <NewsItem news={news.sort((a, b) => b.createdAt - a.createdAt)[0]} />
      )}
      <style jsx>
        {`
          :global(h1.title) {
            padding-top: 1.5rem;
          }
        `}
      </style>
    </ComponentContainer>
  )
}

export default withData(
  compose(
    listCategories,
    listOffers,
    listNews,
  )(Index),
)
