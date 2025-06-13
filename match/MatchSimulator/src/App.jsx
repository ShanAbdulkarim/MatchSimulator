import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RandomGame from "./pages/randomGame";
import Home from "./pages/home";
import NewGame from "./pages/newGame";
import Nav from "./pages/nav";
import ErrorPage from "./pages/errorPage";
import SimPage from "./pages/simGame";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
        <Route path="newGame" element={<NewGame />} />
        <Route path="newGame/:team" element = {<NewGame/>}/>
        <Route path="randomGame" element={<RandomGame />} />
        <Route path="simulate" element={<SimPage/>}/>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
