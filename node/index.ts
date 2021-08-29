import {
  ClientsConfig,
  EventContext,
  LRUCache,
  ParamsContext,
  RecorderState, ServiceContext
} from '@vtex/api'
import { Service } from '@vtex/api'
import { Clients } from './clients'
import { someStates } from './middlewares/someStates'
import { queries } from './resolvers/leads'

const MEDIUM_TIMEOUT_MS = 2 * 1000
const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: MEDIUM_TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface StatusChangeContext extends EventContext<Clients> {
    body: {
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }
  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState { }
}

// Export a service that defines resolvers and clients' options
export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  events: {
    someStates
  },
  graphql: {
    resolvers: {
      Mutation: {},
      Query: queries
    },
  },
})
