import * as uuid from 'uuid/v4'
import { observable, action } from 'mobx'
import Application from 'src/store/features/application'
import Server, { ServerInitialDataType } from './server'
import { INITIAL_SERVERS_AMOUNT } from 'src/constants'

type CluserInitialDataType = {
  id: string
  createdAt: string
  servers: ServerInitialDataType[]
}

class Cluster {
  id: string
  createdAt: Date

  readonly servers = observable<Server>([])
  readonly applications = observable<Application>([])

  constructor(initialData?: CluserInitialDataType) {
    if (initialData) {
      this.id = initialData.id
      this.createdAt = new Date(initialData.createdAt)
      this.addServers(initialData.servers)
      return
    }

    this.id = uuid()
    this.createdAt = new Date()
    this.startup()
  }

  startup() {
    for (let i = 0; i < INITIAL_SERVERS_AMOUNT; i++) {
      this.addServer()
    }
  }

  addServers = (servers: ServerInitialDataType[]) => {
    servers.forEach(this.addServer)
  }

  @action
  addServer = (server?: ServerInitialDataType) => {
    const newServer = new Server(server)
    this.servers.push(newServer)
    return newServer.id
  }

  @action
  destroyServers = () => {
    this.servers.clear()
  }

  @action
  destroyServer = () => {
    const destroyedServer: Server | undefined = this.servers.pop()
    if (destroyedServer) {
      console.log(destroyedServer.applicationIds)
    }
  }

  destroyServerById(id: string) {
    const serverIndex = this.getServerIndexById(id)

    this.servers.splice(serverIndex, 1)
  }

  getServerById(id: string): Server | null {
    return this.servers.find((server: Server) => server.id === id) || null
  }

  getServerIndexById(id: string): number {
    return this.servers.findIndex((server: Server) => server.id === id)
  }
}

export default Cluster
