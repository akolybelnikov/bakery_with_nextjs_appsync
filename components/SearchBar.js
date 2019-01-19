import {
  Button,
  Control,
  Field,
  Icon,
  Level,
  LevelItem,
  LevelRight,
} from "bloomer"
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft"
import { Form, Text } from "informed"
import Router from "next/router"
import { BelowDefault, Default } from "../styles/utils"

export default () => {
  const onSearchTerm = ({ values: { term } }) => {
    if (term && term !== "") {
      Router.push({
        pathname: "/search",
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
        <LevelItem style={{ marginRight: "10px" }}>
          <Form>
            {({ formState }) => {
              return (
                <React.Fragment>
                  <Default>
                    <Field hasAddons>
                      <Control>
                        <Text
                          field="term"
                          id="term"
                          placeholder="Поиск наименований"
                          className="input is-large"
                        />
                      </Control>
                      <Control>
                        <Button
                          isSize="large"
                          isColor="success"
                          type="submit"
                          onClick={() => onSearchTerm(formState)}>
                          <span>Искать</span>
                          <Icon className="fas fa-search" />
                        </Button>
                      </Control>
                    </Field>
                  </Default>
                  <BelowDefault>
                    <Field hasAddons>
                      <Control>
                        <Text
                          field="term"
                          id="term"
                          placeholder="Поиск наименований"
                          className="input"
                        />
                      </Control>
                      <Control>
                        <Button
                          isColor="success"
                          type="submit"
                          onClick={() => onSearchTerm(formState)}>
                          <span>Искать</span>
                          <Icon className="fas fa-search" />
                        </Button>
                      </Control>
                    </Field>
                  </BelowDefault>
                </React.Fragment>
              )
            }}
          </Form>
        </LevelItem>
      </LevelRight>
    </Level>
  )
}
