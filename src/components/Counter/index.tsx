import * as React from 'react'
import styles from './styles.scss'
import { inject } from 'src/utils/storeInject'

type CounterType = {
  count: number
  increase: () => void
  decrease: () => void
}

const Counter: React.FunctionComponent<CounterType> = ({
  count,
  increase,
  decrease,
}) => {
  return (
    <>
      <button type="button" className={styles.button} onClick={decrease}>
        -
      </button>
      {` ${count} `}
      <button type="button" className={styles.button} onClick={increase}>
        +
      </button>
    </>
  )
}

export default inject(({ counter }) => {
  return {
    count: counter.count,
    increase: counter.increase,
    decrease: counter.decrease,
  }
})(Counter)
