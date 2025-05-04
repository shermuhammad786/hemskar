import { configureStore } from '@reduxjs/toolkit'
import studentData from './slice'
import quizData from "./quizSlice"
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage)


const persistConfig = {
    key: 'studentData',
    storage,
};

const persistConfigQuiz = {
    key: 'quizData',
    storage,
}

const persistedStudentDataReducer = persistReducer(persistConfig, studentData);

const persistedQuizDataReducer = persistReducer(persistConfigQuiz, quizData);



export const store = configureStore({
    reducer: {
        data: persistedStudentDataReducer,
        quiz: persistedQuizDataReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// // Export the persistor to use with PersistGate in your application
export const persistor = persistStore(store);