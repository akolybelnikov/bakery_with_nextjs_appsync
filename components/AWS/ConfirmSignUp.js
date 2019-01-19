import { Auth } from 'aws-amplify'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardFooterItem,
  Control,
  Field,
  Label,
  Title,
} from 'bloomer'
import { Form, Text } from 'informed'
import { Mutation } from 'react-apollo'
import { CREATE_USER } from '../../graphql/mutations/user'
import { handleError, validateEmail } from '../../lib/awsAuth'
import ErrorNotification from '../ErrorNotification'
import LoadingScreen from '../LoadingScreen'
import SuccessScreen from '../SuccessScreen'

const withMutation = Component => {
  return function MutationHOC(props) {
    return (
      <Mutation mutation={CREATE_USER}>
        {(mutate, state) => (
          <Component
            {...props}
            mutate={mutate}
            loading={state.loading}
            error={state.error}
          />
        )}
      </Mutation>
    )
  }
}

const ConfirmSignUp = props => {
  const {
    mutate,
    loading,
    error,
    onStateChange,
    setNotification,
    authState,
  } = props
  const confirmSignUp = async formState => {
    setNotification(null)

    if (formState.values.email && formState.values.code) {
      try {
        await Auth.confirmSignUp(
          formState.values.email.trim(),
          formState.values.code.trim(),
          {
            forceAliasCreation: 'true',
          },
        )
        mutate({
          variables: {
            input: {
              email: formState.values.email.trim(),
            },
          },
        })
        if (loading) {
          return <LoadingScreen />
        }
        if (error) return <ErrorScreen />
        setTimeout(() => onStateChange('signIn'), 500)
        setNotification(null)
        return <SuccessScreen />
      } catch (e) {
        const err = handleError(e.code, e.message)
        setNotification(err)
      }
    }
  }

  const resendCode = async formState => {
    setNotification(null)

    if (formState.values.email) {
      try {
        await Auth.resendSignUp(formState.values.email.trim())
        setNotification('Код подтверждения выслан на Ваш адрес эл. почты')
      } catch (e) {
        const err = handleError(e.code)
        setNotification(err)
      }
    } else {
      setNotification('Введите свой адрес эл. почты')
    }
  }

  const dismiss = () => setNotification(null)

  return (
    <React.Fragment>
      {error && <ErrorNotification notification={error} dismiss={dismiss} />}

      {(authState === 'confirmSignUp' || authState === 'signedUp') && (
        <Form>
          {({ formState }) => {
            return (
              <React.Fragment>
                <Title className='has-text-primary is-size-5-mobile'>
                  Подтвердить регистрацию
                </Title>
                <Card>
                  <CardContent>
                    <Field>
                      <Label htmlFor='username'>Адрес эл. почты</Label>
                      <Control>
                        <Text
                          required
                          field='email'
                          id='email'
                          placeholder='Введите свой адрес эл.почты'
                          className='input'
                          validate={validateEmail}
                          validateOnBlur
                        />
                      </Control>
                      <p className='has-text-left is-size-7 has-text-primary'>
                        {formState.errors.email && formState.errors.email}
                      </p>
                    </Field>
                    <Field>
                      <Label htmlFor='code'>Код подтверждения</Label>
                      <Control
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        <Text
                          required
                          type='text'
                          field='code'
                          id='code'
                          placeholder='Введите код'
                          className='input'
                        />
                      </Control>
                    </Field>
                    <Field>
                      <span>Код утерян? </span>
                      <a
                        style={{
                          marginLeft: '10px',
                        }}
                        onClick={() => resendCode(formState)}>
                        Выслать повторно
                      </a>
                    </Field>
                  </CardContent>
                  <CardFooter style={{ flexWrap: 'wrap' }}>
                    <CardFooterItem>
                      <Button
                        isFullWidth
                        isColor='primary'
                        type='submit'
                        onClick={() => confirmSignUp(formState)}>
                        Подтвердить
                      </Button>
                    </CardFooterItem>
                    <CardFooterItem>
                      <a
                        role='button'
                        style={{
                          marginLeft: '10px',
                        }}
                        onClick={() => onStateChange('signIn')}>
                        Вход пользователя
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

const CustomizedConfirmSignUp = withMutation(ConfirmSignUp)

export default CustomizedConfirmSignUp
