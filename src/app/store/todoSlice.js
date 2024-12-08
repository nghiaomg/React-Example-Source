import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload)
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { addTodo, removeTodo, setLoading } = todoSlice.actions
export default todoSlice.reducer 