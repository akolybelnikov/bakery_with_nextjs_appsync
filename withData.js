import Amplify, { Auth } from "aws-amplify"
import { defaultDataIdFromObject } from "aws-appsync"
import { withAppSyncData } from "next-apollo-appsync"

Amplify.configure({
  Auth: {
    identityPoolId: process.env.IDENTITY_POOL_ID,
    region: process.env.APPSYNC_REGION,
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.WEBCLIENT_ID,
    mandatorySignIn: false,
  },
})

const config = {
  url: process.env.APPSYNC_GRAPHQLENDPOINT,
  region: process.env.APPSYNC_REGION,
  auth: {
    type: process.env.APPSYNC_AUTHENTICATIONTYPE,
    credentials: () => Auth.currentCredentials(),
  },
  complexObjectsCredentials: () => Auth.currentCredentials(),
  offlineConfig: {
    callback: (err, succ) => {
      if (err) {
        const { mutation } = err
        console.warn(`Error for ${mutation}`, err)
      } else {
        const { mutation } = succ
        console.info(`Success for ${mutation}`, succ)
      }
    },
  },
  cacheOptions: {
    dataIdFromObject: obj => {
      let id = defaultDataIdFromObject(obj)

      if (!id) {
        const { __typename: typename } = obj
        switch (typename) {
          case "User":
            return `${typename}:${obj}.id`
          case "OfferConnection":
            return `${typename}:${obj}.id`
          case "NewsConnection":
            return `${typename}:${obj}.id`
          case "CategoriesConnection":
            return `${typename}:${obj}.id`
          case "ProductConnection":
            return `${typename}:${obj}.id`
          default:
            return id
        }
      }

      return id
    },
    addTypename: true,
  },
}

export default withAppSyncData(config)
