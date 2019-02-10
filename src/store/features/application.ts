import * as uuid from 'uuid/v4'
import { ApplicationImage } from 'src/types'

export type ApplicationInitialDataType = {
  id?: string
  image: ApplicationImage
  createdAt?: string
}

class Application {
  id: string
  image: ApplicationImage
  createdAt: Date

  constructor(initialData: ApplicationInitialDataType) {
    this.image = initialData.image
    this.id = initialData.id || uuid()
    this.createdAt = initialData.createdAt
      ? new Date(initialData.createdAt)
      : new Date()
  }
}

export default Application
