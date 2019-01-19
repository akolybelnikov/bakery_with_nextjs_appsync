import { I18n } from "@aws-amplify/core"
import {
  Authenticator,
  ForgotPassword,
  RequireNewPassword,
} from "aws-amplify-react"
import { Hero, HeroBody } from "bloomer"
import { Query } from "react-apollo"
import CustomizedConfirmSignUp from "../components/AWS/ConfirmSignUp"
import CustomizedSignIn from "../components/AWS/SignIn"
import CustomizedSignUp from "../components/AWS/SignUp"
import CustomizedVerifyContact from "../components/AWS/VerifyContact"
import ErrorBoundary from "../components/ErrorBoundary"
import ErrorScreen from "../components/ErrorScreen"
import LoadingScreen from "../components/LoadingScreen"
import SuccessScreen from "../components/SuccessScreen"
import GET_USER from "../graphql/queries/user"
import { currentUser, dict, map } from "../lib/awsAuth"
import Router from "next/router"
import { AwsTheme } from "../styles/utils"
import withData from "../withData"

class Authenticate extends React.PureComponent {
  state = {
    currentUser: null,
    error: null,
    attribute: "password",
  }
  componentDidMount() {
    I18n.setLanguage("ru")
    I18n.putVocabularies(dict)
  }

  onStateChange = async authState => {
    if (authState === "signedIn") {
      const authUser = await currentUser()
      this.setState({ currentUser: authUser })
      this.props.setCurrentUser(authUser.attributes.email, true)
      setTimeout(() => {
        if (this.props.currentProduct) {
          Router.push({
            pathname: "product",
            query: {
              id: this.props.currentProduct.productId,
              category: this.props.currentProduct.category,
            },
          })
          this.props.setProduct(null)
        } else {
          Router.push("/")
        }
      }, 1000)
    }
  }

  setNotification = error => {
    this.setState({ error: error })
  }

  onAttributeToggle = () => {
    this.state.attribute === "password"
      ? this.setState({ attribute: "text" })
      : this.setState({ attribute: "password" })
  }

  render() {
    const { currentUser } = this.state
    return (
      <ErrorBoundary>
        <Hero isColor="success" isFullHeight isFullWidth>
          <HeroBody style={{ justifyContent: "center" }}>
            <Authenticator
              hideDefault={true}
              theme={AwsTheme}
              authState="signUp"
              errorMessage={map}
              onStateChange={this.onStateChange}>
              <CustomizedSignIn
                setNotification={this.setNotification}
                attribute={this.state.attribute}
                onAttributeToggle={this.onAttributeToggle}
                error={this.state.error}
              />
              <ForgotPassword />
              <RequireNewPassword />
              <CustomizedVerifyContact
                setNotification={this.setNotification}
                error={this.state.error}
              />
              <CustomizedConfirmSignUp
                setNotification={this.setNotification}
                error={this.state.error}
              />
              <CustomizedSignUp
                setNotification={this.setNotification}
                attribute={this.state.attribute}
                onAttributeToggle={this.onAttributeToggle}
                error={this.state.error}
              />
            </Authenticator>
            {currentUser && (
              <Query
                query={GET_USER}
                variables={{ email: currentUser.attributes.email }}>
                {({ loading, error }) => {
                  if (loading) {
                    return <LoadingScreen />
                  }
                  if (error) return <ErrorScreen />
                  return <SuccessScreen />
                }}
              </Query>
            )}
          </HeroBody>
        </Hero>
      </ErrorBoundary>
    )
  }
}

export default withData(Authenticate)
