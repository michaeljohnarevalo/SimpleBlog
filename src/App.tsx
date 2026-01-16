
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import BlogList from './pages/blog/BlogListPage'
import ProtectedRoute from './components/layout/ProtectedRoute'
import CreateBlog from './pages/blog/CreateBlog'
import EditBlog from './pages/blog/EditBlog'

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/'  element={<BlogList/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route
          path='/create'
          element={
            <ProtectedRoute>
              <CreateBlog/>
            </ProtectedRoute>
          }
          />
          <Route
          path='/edit/:id'
          element={
            <ProtectedRoute>
              <EditBlog/>
            </ProtectedRoute>
          }
          
          />
      </Routes>
    </Router>
  )
}

export default App
