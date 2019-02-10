import { observable } from 'mobx'

export default class Counter {
  @observable
  count: number = 0

  increase = () => {
    this.count++
  }

  decrease = () => {
    this.count--
  }
}
