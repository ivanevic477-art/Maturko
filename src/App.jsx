import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SubjectList from './pages/SubjectList'
import SubjectPage from './pages/SubjectPage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { AuthProvider } from './auth/AuthContext'
import RequireAuth from './auth/RequireAuth'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="registracija" element={<Signup />} />
          <Route path="prijava" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="ucionice" element={<SubjectList section="ucionice" />} />
            <Route path="ucionice/:slug" element={<SubjectPage kind="ucionice" />} />
            <Route path="probni-ispiti" element={<SubjectList section="probni-ispiti" />} />
            <Route path="probni-ispiti/:slug" element={<SubjectPage kind="probni-ispiti" />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}
