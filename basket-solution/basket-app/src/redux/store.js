import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' 
import logger from 'redux-logger'
import rootReducer from './rootReducer' 

const persistConfig = {
    key: 'root',
    storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer) 

const store = createStore(
    persistedReducer, 
    applyMiddleware(logger)
)

const  persistor = persistStore(store); 

export {store, persistor}