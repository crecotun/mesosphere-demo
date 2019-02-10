import App, { Container } from 'next/app'
import React from 'react'
import { initializeStore } from 'src/store'
import { Provider } from 'mobx-react'

import 'src/styles/global/index.scss'

class MyMobxApp extends App {
  static async getInitialProps(appContext: any) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const mobxStore = initializeStore()
    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStore = mobxStore

    let appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      initialMobxState: mobxStore,
    }
  }

  private mobxStore: any

  constructor(props: any) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.mobxStore = isServer ? props.initialMobxState : initializeStore()
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider {...this.mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
export default MyMobxApp
