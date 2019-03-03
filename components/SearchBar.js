import {
  Button,
  Control,
  Field,
  Icon,
  Level,
  LevelItem,
  LevelRight,
} from 'bloomer'
import { LevelLeft } from 'bloomer/lib/components/Level/LevelLeft'
import { Form, Text } from 'informed'
import Router from 'next/router'

export default () => {
  const onSearchTerm = ({ values: { term } }) => {
    if (term && term !== '') {
      Router.push({
        pathname: '/search',
        query: {
          term: term,
        },
      })
    }
  }

  return (
    <Level isMobile>
      <LevelLeft />
      <LevelRight>
        <LevelItem style={{ marginRight: '10px' }}>
          <Form>
            {({ formState }) => {
              return (
                <Field hasAddons>
                  <Control>
                    <Text
                      field='term'
                      id='term'
                      placeholder='Поиск наименований'
                      className='input'
                    />
                  </Control>
                  <Control>
                    <Button
                      isColor='success'
                      type='submit'
                      onClick={() => onSearchTerm(formState)}>
                      <span>Искать</span>
                      <Icon className='fas fa-search' />
                    </Button>
                  </Control>
                </Field>
              )
            }}
          </Form>
        </LevelItem>
      </LevelRight>
    </Level>
  )
}
