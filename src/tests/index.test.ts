import { RootStore } from '../store'

let rootStore: RootStore

beforeEach(() => {
  rootStore = new RootStore()
})

describe('counter', () => {
  test('increase', () => {
    const counterStore = rootStore.counter

    counterStore.increase()
    counterStore.increase()
    expect(counterStore.count).toBe(2)
  })

  test('decrease', () => {
    const counterStore = rootStore.counter

    counterStore.decrease()
    counterStore.decrease()
    expect(counterStore.count).toBe(-2)
  })
})
