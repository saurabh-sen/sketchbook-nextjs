import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '@/components/Menu/MenuSlice'
import toolboxReducer from "@/components/Toolbox/ToolboxSlice"
// ...

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    toolbox: toolboxReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch