import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';

function App(){
  return (
    <>
      <Navbar />
    <Routes>
      <Route path="/" element={<PrivateRoute/>}>
        <Route path="/" element={<HomePage/>} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default App;