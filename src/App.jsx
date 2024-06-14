import * as React from 'react';
import './App.css'
import SearchAppBar from './components/SearchAppBar'
import Home from './components/Home'
import { counterContext } from './Context/Context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Video from './components/Video';

function App() {
  const [category, setCategory] = React.useState(0)
  const [check, setCheck] = React.useState(false);

  return (
    <>
    <counterContext.Provider value={{check, setCheck}}>
    <Router>
        <SearchAppBar setCategory={setCategory} />
        <Routes>
          <Route path="/" element={<Home category={category} />} />
          <Route path="video/:categoryId/:videoId" element={<Video />} />
        </Routes>
      </Router>
    </counterContext.Provider>
    </>
  )
}

export default App
