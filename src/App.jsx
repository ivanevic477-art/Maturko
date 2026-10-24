import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Home from './pages/Home'
import SubjectList from './pages/SubjectList'
import SubjectPage from './pages/SubjectPage'
import Quiz from './pages/Quiz'
import FinalExam from './pages/FinalExam'
import EssayTest from './pages/EssayTest'
import Progress from './pages/Progress'
import Pricing from './pages/Pricing'
import Info from './pages/Info'
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
          <Route index element={<Landing />} />
          <Route path="pretplata" element={<Pricing />} />
          <Route path=":page" element={<Info />} />
          <Route path="registracija" element={<Signup />} />
          <Route path="prijava" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="pocetna" element={<Home />} />
            <Route path="napredak" element={<Progress />} />
            <Route path="ucionice" element={<SubjectList section="ucionice" />} />
            <Route path="ucionice/:slug" element={<SubjectPage kind="ucionice" />} />
            <Route path="ucionice/:slug/kviz/:n" element={<Quiz />} />
            <Route path="ucionice/:slug/zavrsni" element={<FinalExam />} />
            <Route path="ucionice/:slug/esej" element={<EssayTest />} />
            <Route path="probni-ispiti" element={<SubjectList section="probni-ispiti" />} />
            <Route path="probni-ispiti/:slug" element={<SubjectPage kind="probni-ispiti" />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}
