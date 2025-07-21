import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';
import rootSaga from './root-saga';

// Настройки для persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user'], // сохраняемые редюсеры
};

// Обертывание редюсера в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создание middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

// Создание стора
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false, // для persist
    }).concat(middlewares),
});

// Запуск саг
sagaMiddleware.run(rootSaga);

// Создание persistor для обертки <PersistGate />
export const persistor = persistStore(store);