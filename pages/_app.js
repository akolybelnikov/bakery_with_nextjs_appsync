import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/header'
import MobileFooter from '../components/MobileFooter'
import { currentUser } from '../lib/awsAuth'
import Fonts from '../lib/fonts'
import '../node_modules/slick-carousel/slick/slick-theme.css'
import '../node_modules/slick-carousel/slick/slick.css'
import '../styles/bulma.scss'
import { NonTouch, Touch } from '../styles/utils'

class ExtendedApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  async componentDidMount() {
    const authUser = await currentUser()
    if (authUser) {
      this.setCurrentUser(authUser.attributes.email, true)
    }
    await Fonts()
  }

  state = {
    email: null,
    isAuthenticated: false,
    currentProduct: null,
  }

  setCurrentUser = (email, isAuthenticated) => {
    this.setState({ email: email, isAuthenticated: isAuthenticated })
  }

  setProduct = product => {
    this.setState({ currentProduct: product })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <meta charSet='utf-8' />
          <meta
            name='Description'
            content='A bakery in Moscow with a wide sortment of sweets, bread, coffee and hand-made cakes'
          />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='og:theme_color' content='#52082d' />
          <meta name='og:url' content='https://vsebulochki.com' />
          <meta
            name='og:keywords'
            content='bread, bakery, cakes, wedding, celebration, milk, sweets, cupcakes'
          />
          <title>Все Булочки Тут</title>
          <meta
            property='og:image'
            content='/static/manifest/icons/icon-512x512.png'
          />
          <link rel='manifest' href='/static/manifest/manifest.json' />
          <link
            rel='shortcut icon'
            href='/static/favicon.ico'
            type='image/x-icon'
          />
          <script
            defer
            src='https://use.fontawesome.com/releases/v5.3.1/js/all.js'
          />
        </Head>
        <Header
          {...pageProps}
          isAuthenticated={this.state.isAuthenticated}
          email={this.state.email}
        />
        <Component
          {...pageProps}
          setCurrentUser={this.setCurrentUser}
          isAuthenticated={this.state.isAuthenticated}
          email={this.state.email}
          currentProduct={this.state.currentProduct}
          setProduct={this.setProduct}
        />
        <Touch>
          <MobileFooter
            {...pageProps}
            isAuthenticated={this.state.isAuthenticated}
          />
        </Touch>
        <NonTouch>
          <Footer />
        </NonTouch>

        <style jsx global>
          {`
            body {
              margin: 0;
              padding: 0;
              font-family: 'Raleway', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              overflow-x: hidden;
              color: #331507;
            }

            html {
              padding-top: 7.25rem;
            }

            @media screen and (max-width: 599px) {
              html {
                padding-top: 5.5rem;
              }
            }
            .container {
              position: relative;
            }
          `}
        </style>
      </Container>
    )
  }
}

export default ExtendedApp
