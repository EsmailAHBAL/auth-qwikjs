import { QwikAuth$ } from "@auth/qwik";
import GitHub from "@auth/qwik/providers/github";
import CredentialsProvider from "@auth/core/providers/credentials"

export const cconfig = CredentialsProvider({


  name: "Nestjs",

  credentials: {
    username: {
      label: "user name"
    }
    , password: {
      label: "password",
      type: 'password'
    }
  }
  , async authorize(c, r): Promise<any> {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST"
      , headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      , body: JSON.stringify({
        username: c.username, password: c.password
      })
    })
    const returned = {
      user: {
        id: 2, username: c.username, password: c.password
      }

    }
    const json = await res.json()
    console.log('jwt _ ', json)
    if (json.token_user) return returned
    return null
  }
  ,
})
export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(

  ({ env }) => ({
    secret: "A",
    providers: [cconfig],
    callbacks: {
      async jwt(p: any) {
        if (p.user) {
          p.token.id = p.user.user.id
          p.token.username = p.user.user.username
          p.token.email = 'su#gmail.com'
        }
        console.log('this token = ', p.token)
        return p.token
      }
      ,
      async session({ session, token }) {


        if (token) {
          session.user.id = `${token.id}`
          session.user.name = token.username as string

        }
        console.log('this sesssion = ', session)
        return session
      }
    },
    session: {
      strategy: "jwt"
    }
  }),
);
