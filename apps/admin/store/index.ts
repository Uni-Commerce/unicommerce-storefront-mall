import { reducer as appReducer } from './app'
import { reducer as userReducer } from './user'

export const rootReducer = {
  app: appReducer,
  user: userReducer
}
