import { Query } from 'react-apollo';
import ComponentContainer from '../components/ComponentContainer';
import News from '../components/News';
import LIST_NEWS from '../graphql/queries/news';
import withData from '../withData';

const AboutPage = props => {
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
    </ComponentContainer>
  )
}

export default withData(AboutPage)
