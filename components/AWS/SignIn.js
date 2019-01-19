import { Auth } from 'aws-amplify'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardFooterItem,
  Control,
  Field,
  Icon,
  Label,
  Title,
} from 'bloomer'
import { Form, Text } from 'informed'
import { Mutation } from 'react-apollo'
import { UPDATE_USER } from '../../graphql/mutations/user'
import { currentUser, handleError } from '../../lib/awsAuth'
import ErrorNotification from '../ErrorNotification'

const withMutation = Component => {
  return function MutationHOC(props) {
    return (
      <Mutation mutation={UPDATE_USER}>
        {(mutate, state) => (
          <Component
            {...props}
            mutate={mutate}
            loading={state.loading}
            mutationError={state.error}
          />
        )}
      </Mutation>
    )
  }
}

const SignIn = props => {
  const {
    authState,
    onStateChange,
    attribute,
    onAttributeToggle,
    setNotification,
    error,
    mutate,
    mutationError,
  } = props

  const signIn = async formState => {
    setNotification(null)

    if (formState.values.email && formState.values.password) {
      try {
        await Auth.signIn(
          formState.values.email.trim(),
          formState.values.password.trim(),
        )
        const authUser = await currentUser()
        if (!authUser.attributes.email_verified) {
          onStateChange('verifyContact')
        } else {
          mutate({
            variables: {
              input: {
                email: formState.values.email.trim(),
                lastActive: Math.floor(Date.now() / 1000),
              },
            },
          })
          if (mutationError) console.error(mutationError)
          onStateChange('signedIn')
        }
      } catch (e) {
        if (e.code === 'UserNotConfirmedException') {
          setNotification(
            'Подтвердите свой адрес эл. почты с помощью высланного Вам кода',
          )
          onStateChange('confirmSignUp')
        } else {
          const error = handleError(e.code)
          setNotification(error)
        }
      }
    }
  }

  const dismiss = () => setNotification(null)

  return (
    <React.Fragment>
      {error && <ErrorNotification notification={error} dismiss={dismiss} />}
      {(authState === 'signIn' || authState === 'signedOut') && (
        <Form>
          {({ formState }) => {
            return (
              <React.Fragment>
                <Title className='has-text-primary is-size-5-mobile'>Вход пользователя</Title>
                <Card>
                  <CardContent>
                    <Field>
                      <Label htmlFor='email'>Адрес эл. почты</Label>
                      <Control>
                        <Text
                          field='email'
                          id='email'
                          placeholder='Введите свой адрес эл.почты'
                          className='input'
                        />
                      </Control>
                    </Field>
                    <Field>
                      <Label htmlFor='password'>Пароль</Label>
                      <Control
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        <Text
                          type={attribute}
                          field='password'
                          id='password'
                          placeholder='Введите свой пароль'
                          className='input'
                        />
                        <Icon
                          onClick={onAttributeToggle}
                          style={{
                            cursor: 'pointer',
                            margin: '0 0 0 10px',
                          }}
                          className='fas fa-eye has-text-primary'
                        />
                      </Control>
                    </Field>
                    <Field>
                      <span>Пароль утерян? </span>
                      <a
                        style={{
                          marginLeft: '10px',
                        }}
                        onClick={() => onStateChange('forgotPassword')}>
                        Запросить новый пароль
                      </a>
                    </Field>
                  </CardContent>
                  <CardFooter style={{ flexWrap: 'wrap' }}>
                    <CardFooterItem>
                      <Button
                        isFullWidth
                        isColor='primary'
                        type='submit'
                        onClick={() => signIn(formState)}>
                        Войти
                      </Button>
                    </CardFooterItem>
                    <CardFooterItem>
                      <span>Нет профиля?</span>
                      <a
                        style={{
                          marginLeft: '10px',
                        }}
                        onClick={() => onStateChange('signUp')}>
                        Зарегистрироваться
                      </a>
                    </CardFooterItem>
                  </CardFooter>
                </Card>
              </React.Fragment>
            )
          }}
        </Form>
      )}
    </React.Fragment>
  )
}

const CustomizedSignIn = withMutation(SignIn)

export default CustomizedSignIn
