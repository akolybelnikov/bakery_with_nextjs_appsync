import { Level, LevelItem, Title, Icon } from 'bloomer'
import Link from 'next/link'
import { compose, Query } from 'react-apollo'
import Carousel from '../components/Carousel'
import Categories from '../components/Categories'
import ComponentContainer from '../components/ComponentContainer'
import NewsItem from '../components/NewsItem'
import LIST_OFFERS from '../graphql/queries/offers'
import { listCategories, listNews } from '../graphql/resolvers/index'
import '../node_modules/slick-carousel/slick/slick-theme.css'
import '../node_modules/slick-carousel/slick/slick.css'
import withData from '../withData'

const Index = ({ news, categories }) => {
  return (
    <ComponentContainer>
      <Query query={LIST_OFFERS}>
        {({ data: { listOffers } }) => {
          if (listOffers) {
            return <Carousel items={listOffers.items} />
          } else {
            return null
          }
        }}
      </Query>
      {categories && <Categories categories={categories} />}
      <Title
        style={{ margin: '1rem' }}
        hasTextColor='primary'
        className='is-size-6-mobile is-size-4 has-text-centered-mobile'>
        Наши новости
      </Title>
      {news && (
        <NewsItem
          news={news.sort((a, b) => b.createdAt - a.createdAt)[0]}
          DTsize='300x300'
        />
      )}
      <Level>
        <LevelItem style={{ justifyContent: 'flex-end' }}>
          <Link
            href={{
              pathname: '/about',
            }}>
            <a className='button is-inverted is-primary is-pulled-right'>
              <span>Смотреть все наши новости</span>
              <Icon className='fas fa-chevron-right' />
            </a>
          </Link>
        </LevelItem>
      </Level>
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
    listNews,
  )(Index),
)
