import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Store } from '../lib/store'

const taskBIN = function ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Store>
        <Component {...pageProps} />
      </Store>
    </SessionProvider>
  )
}

export default taskBIN;