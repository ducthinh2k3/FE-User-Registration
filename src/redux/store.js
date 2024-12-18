import { legacy_createStore as createStore} from 'redux'
import rootReducer from './reducer'

// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist'
  
// import storage from 'redux-persist/lib/storage'
// import { PersistGate } from 'redux-persist/integration/react'
// import { configureStore } from '@reduxjs/toolkit'

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)


// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }),
//   })

// export let persistor = persistStore(store)
const store = createStore(rootReducer)
export default store;