import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import './index.css'
import LoginPage, { action as loginAction } from './routes/login-page'
import ErrorPage from './routes/error-page'
import Posts, { loader as postsLoader } from './routes/posts'
import Comments, { loader as commentsLoader } from './routes/comments'
import Post, { loader as postLoader } from './routes/post'
import PostNew, { action as postNewAction } from './routes/post-new'
import PostEdit, {
  action as postEditAction,
  loader as postEditLoader,
} from './routes/post-edit'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader() {
      if (!localStorage.getItem('token')) {
        return redirect('/login')
      }

      return null
    },
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            loader() {
              return redirect('/posts')
            },
          },
          {
            path: 'posts',
            element: <Posts />,
            loader: postsLoader,
          },
          {
            path: 'post/new',
            element: <PostNew />,
            action: postNewAction,
          },
          {
            path: 'post/:postId',
            element: <Post />,
            loader: postLoader,
          },
          {
            path: 'post/:postId/edit',
            element: <PostEdit />,
            loader: postEditLoader,
            action: postEditAction,
          },
          {
            path: 'comments',
            element: <Comments />,
            loader: commentsLoader,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    action: loginAction,
    loader() {
      if (localStorage.getItem('token')) {
        return redirect('/')
      }

      return null
    },
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
