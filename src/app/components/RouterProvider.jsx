'use client'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from '../routers'

export function RouterProvider({ children }) {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          const Component = route.element
          return (
            <Route 
              key={route.path}
              path={route.path}
              element={<Component />}
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
} 