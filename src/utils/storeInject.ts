import { observer, inject as mobxInject } from 'mobx-react'
import { ComponentType } from 'react'

import { RootStore } from 'src/store'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Subtract<T, K> = Omit<T, keyof K>

interface IInjectOptions {
  observe?: boolean
}

export function inject<I extends {} = {}>(
  injector: (stores: RootStore, props: never) => I,
  options?: IInjectOptions,
) {
  const { observe } = Object.assign({ observe: false }, options)
  return <P>(
    WrappedComponent: ComponentType<P>,
  ): ComponentType<Subtract<P, I>> => {
    let Component = WrappedComponent
    if (observe) {
      Component = observer(Component)
    }

    return mobxInject(injector)(Component)
  }
}
