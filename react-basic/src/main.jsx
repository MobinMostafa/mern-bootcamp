import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Blog from './pages/Blog.jsx';


const router = createBrowserRouter([
  {
  path : "/",
  element : <Layout/>,
  errorElement: <ErrorPage/>,
  children: [
    {
      path : "",
      element: <Home/>,
    },
    {
      path : "/blog",
      element: <Blog/>
    }
  ]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
