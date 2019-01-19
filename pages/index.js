import { Title } from "bloomer"
import { compose } from "react-apollo"
import Categories from "../components/Categories"
import ComponentContainer from "../components/ComponentContainer"
import NewsItem from "../components/NewsItem"
import OffersCarousel from "../components/OffersCarousel"
import {
  listCategories,
  listNews,
  listOffers,
} from "../graphql/resolvers/index"
import withData from "../withData"

const Index = props => {
  const { offers, news, categories } = props
  return (
    <ComponentContainer>
      <OffersCarousel offers={offers} />
      <Categories categories={categories} />
      <Title
        style={{ margin: "1rem" }}
        hasTextColor="primary"
        className="is-size-5-mobile is-size-3 has-text-centered-mobile">
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
}

const Home = compose(
  listCategories,
  listOffers,
  listNews,
)(Index)

export default withData(Home)
