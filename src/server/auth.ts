import { RequestEventBase } from "@builder.io/qwik-city";
import { AuthConfig } from '@auth/core'
import { Provider } from '@auth/core/providers'

import Credentials from "@auth/core/providers/credentials";
import Auth0 from "@auth/core/providers/auth0";
export const auth_config = (e: RequestEventBase): AuthConfig => {
  return {
    trustHost: true,
    providers: [
      Auth0({ clientId: "kdfjj" })
      ,
      Credentials({
        name: "cdl"
        , credentials: {
          username: {
            label: "User Name"

          }
          , password: {
            label: "Password"

          }
        }
        , async authorize(credentials, request) {
          if (credentials.username === 'admin')
            return {
              id: '1', username: credentials.username
            }
          return null
        },
      })
    ] as Provider[]
  }

}
