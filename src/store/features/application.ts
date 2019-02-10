import * as uuid from 'uuid/v4'
import { ApplicationImage } from 'src/types'

class Application {
  id: string
  image: ApplicationImage
  createdAt: Date

  constructor(image: ApplicationImage) {
    this.image = image
    this.id = uuid()
    this.createdAt = new Date()
  }
}

export default Application
