import { Title } from 'bloomer'
import Categories from '../components/Categories'
import ComponentContainer from '../components/ComponentContainer'
import NewsItem from '../components/NewsItem'
import withData from '../withData'

export default withData(({ offers, news, categories }) => {
  return (
    <ComponentContainer>
      <Categories categories={categories} />
      <Title
        style={{ margin: '1rem' }}
        hasTextColor='primary'
        className='is-size-5-mobile is-size-3 has-text-centered-mobile'>
        Наши новости
      </Title>
      <NewsItem news={news.sort((a, b) => b.createdAt - a.createdAt)[0]} />
      <style jsx>
        {`
          :global(h1.title) {
            padding-top: 1.5rem;
          }
        `}
      </style>
    </ComponentContainer>
  )
})
