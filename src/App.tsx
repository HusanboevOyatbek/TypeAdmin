import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./page/LoginPage"
import ActorPage from "./page/ActorPage"
import MoviePage from "./page/MoviePage"
import DerectorPage from "./page/DerectorPage"
import GanerPage from "./page/GanerPage"
import CategoryPage from "./page/CategoryPage"
import { useState } from "react"
import Sidebar from "./components/Sidebar"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import MovieActorPage from "./page/MovieActorPage"


const getAuth = (): boolean => {
  const auth = localStorage.getItem("auth")

  return auth ? JSON.parse(auth) === true : false
}

function App() {

  const qureyClint = new QueryClient()



  const [isAuth, setIsAuth]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(getAuth)



  return (
    <QueryClientProvider client={qureyClint}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LoginPage setIsAuth={setIsAuth} />} />
          <Route element={isAuth ? <Sidebar /> : <Navigate to={"/"} />}>
            <Route path="admin/actor" element={<ActorPage />} />
            <Route path="admin/movie" element={<MoviePage />} />
            <Route path="admin/director" element={<DerectorPage />} />
            <Route path="admin/genre" element={<GanerPage />} />
            <Route path="admin/category" element={<CategoryPage />} />
            <Route path="admin/movie-actor" element={<MovieActorPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App