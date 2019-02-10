import { observable, action } from 'mobx'
import * as uuid from 'uuid/v4'

export type ServerInitialDataType = {
  id: string
  createdAt: string
  applicationIds: string[]
}

class Server {
  id: string
  createdAt: Date
  readonly applicationIds = observable<string>([])

  constructor(initialData?: ServerInitialDataType) {
    if (initialData) {
      this.id = initialData.id
      this.createdAt = new Date(initialData.createdAt)
      this.addApplications(initialData.applicationIds)

      return
    }

    this.id = uuid()
    this.createdAt = new Date()
  }

  addApplications(ids: string[]) {
    ids.forEach(this.addAplication)
  }

  @action
  addAplication(id: string) {
    this.applicationIds.push(id)
  }
}

export default Server