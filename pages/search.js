import { Icon } from 'bloomer'
import { Button } from 'bloomer/lib/elements/Button'
import { withRouter } from 'next/router'
import ComponentContainer from '../components/ComponentContainer'
import SearchResults from '../components/SearchResults'
import Router from "next/router"
import { BelowDefault, Default } from '../styles/utils'
import withData from '../withData'
import { Level } from 'bloomer/lib/components/Level/Level'
import { LevelItem } from 'bloomer/lib/components/Level/LevelItem'

const Search = ({
  router: {
    query: { term },
  },
}) => {
  return (
    <ComponentContainer>
      <Level isMobile='true' style={{justifyContent: 'start'}}>
        <BelowDefault>
          <LevelItem style={{flexGrow: 0}}>
            <Icon
              className='fas fa-chevron-left has-text-primary'
              style={{ padding: '2rem' }}
              onClick={() => Router.back()}
            />
          </LevelItem>
        </BelowDefault>
        <Default>
          <LevelItem style={{flexGrow: 0}}>
            <Button isColor='primary' onClick={() => Router.back()}>
              <Icon className='fas fa-chevron-left' />
              <span>Вернуться</span>
            </Button>
          </LevelItem>
        </Default>
      </Level>
      {term && <SearchResults term={term} />}
    </ComponentContainer>
  )
}

const SearchWithRouter = withRouter(Search)

export default withData(SearchWithRouter)
