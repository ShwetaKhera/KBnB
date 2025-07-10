import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import ProfilePage from './pages/ProfilePage'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvider } from './UserContext'
import PlacePage from './pages/PlacePage'
import BookingsPage from './pages/BookingsPage'
import BookingPlace from './pages/BookingPage'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/account/:subpage?' element={<ProfilePage />}></Route>
          <Route path='/account/:subpage/:action' element={<ProfilePage />}></Route>
          <Route path='/account/places/:id' element={<ProfilePage />}></Route>
          <Route path='/place/:id' element={<PlacePage />}></Route>
          <Route path='/account/bookings' element={<BookingsPage />}></Route>
          <Route path='/account/bookings/:id' element={<BookingPlace />}></Route>
        </Route>
        
      </Routes>
    </UserContextProvider>
  )
}

export default App
