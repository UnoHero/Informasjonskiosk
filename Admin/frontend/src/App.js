import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ControlPanel from './components/ControlPanel'
import View from "./components/ViewBox"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
          </Routes>
        </div>
        <Header />
        <ControlPanel />
        <View />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;