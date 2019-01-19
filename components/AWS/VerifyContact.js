import { Auth } from 'aws-amplify';
import { Button, Card, CardContent, CardFooter, CardFooterItem, CardHeader, CardHeaderTitle, Control, Field, Label } from 'bloomer';
import { Form, Text } from 'informed';
import { handleError } from '../../lib/awsAuth';
import ErrorNotification from '../ErrorNotification';

const CustomizedVerifyContact = props => {
  const {
    onStateChange,
    setNotification,
    error,
    authState,
  } = props

  const verifyContact = async formState => {
    setNotification(null)
    if (formState.values.email) {
      try {
        await Auth.verifyCurrentUserAttribute(formState.values.email.trim())
        setNotification('Код подтверждения выслан на Ваш адрес эл. почты')
        onStateChange('confirmSignUp')
      } catch (e) {
        const err = handleError(e.code, e.message)
        setNotification(err)
      }
    }
  }

  const dismiss = () => setNotification(null)

  return (
    <React.Fragment>
      {error && <ErrorNotification notification={error} dismiss={dismiss} />}
      {authState === 'verifyContact' && (
        <Form>
          {({ formState }) => {
            return (
              <Card>
                <CardHeader>
                  <CardHeaderTitle>
                    Восстановление профиля требует подтвержденной контактной
                    информации
                  </CardHeaderTitle>
                </CardHeader>
                <CardContent>
                  <Field>
                    <Label htmlFor='username'>Адрес эл. почты</Label>
                    <Control>
                      <Text
                        field='email'
                        id='email'
                        placeholder='Введите свой адрес эл.почты'
                        className='input'
                      />
                    </Control>
                  </Field>
                </CardContent>
                <CardFooter style={{ flexWrap: 'wrap' }}>
                  <CardFooterItem>
                    <Button
                      isFullWidth
                      isColor='primary'
                      type='submit'
                      onClick={() => verifyContact(formState)}>
                      Подтвердить
                    </Button>
                  </CardFooterItem>
                  <CardFooterItem>
                    <a
                      style={{
                        marginLeft: '10px',
                      }}
                      onClick={() => onStateChange('signedIn')}>
                      В другой раз
                    </a>
                  </CardFooterItem>
                </CardFooter>
              </Card>
            )
          }}
        </Form>
      )}
    </React.Fragment>
  )
}

export default CustomizedVerifyContact
