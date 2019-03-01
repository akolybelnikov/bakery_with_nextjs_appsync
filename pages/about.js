import { Query } from 'react-apollo';
import ComponentContainer from '../components/ComponentContainer';
import News from '../components/News';
import LIST_NEWS from '../graphql/queries/news';
import withData from '../withData';
import Instafeed from '../components/Instafeed'

const AboutPage = () => {
  return (
    <ComponentContainer>
      <Query query={LIST_NEWS}>
        {({ data: { listNews } }) => {
          if (listNews) {
            return <News news={listNews.items.sort((a, b) => b.createdAt - a.createdAt)} />
          } else {
            return null
          }
        }}
      </Query>
      <Instafeed />
    </ComponentContainer>
  )
}

export default withData(AboutPage)
