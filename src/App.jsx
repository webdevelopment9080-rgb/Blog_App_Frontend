
import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import { AuthorRoutes, CreateBlog, PublicContainer, SingleBlog, UserProfile } from './Components'
import { Homepage, Login, Register } from './pages'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ProtectedRoutes from './Components/ProtectedRoutes'
import { AuthorDashboard } from './pages/Author'
import EditBlog from './Components/EditBlog'

function App() {

  const router = createBrowserRouter([

    {
      path:"/",
      Component:PublicContainer,
      children:[

        {
          index:true,
          Component:Homepage
        },
        {

          path:"blogs/:id", 
          Component: SingleBlog
        },
        {
          path:"register",
          Component:Register
        },
        {
          path:"login",
          Component:Login
        },

        {
          path:"me",
          Component: ProtectedRoutes,
          children:[

            {
              index:true,
              Component: UserProfile

            },
            {
              path:'author',
              Component: AuthorRoutes,

              children:[
                {

                  index:true,
                  Component: AuthorDashboard

                },
                {
                  path: 'create-blog',
                  Component: CreateBlog
                },
                {
                  path:"edit-blog/:id",
                  Component:EditBlog
                }
              ]
            }
          ]

        }
      ]
    }


  ])


  return (
   <>
   
   <Provider store={store}>

   <RouterProvider router={router}></RouterProvider>
   </Provider>
   
   
   
   </>
  )
}

export default App
