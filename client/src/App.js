import './App.css'
import 'antd/dist/antd.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddEditProject from './components/AddEditProject';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<AddEditProject task={'add'} />} />
        <Route path='/edit/:projectId' element={<AddEditProject task={'edit'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
