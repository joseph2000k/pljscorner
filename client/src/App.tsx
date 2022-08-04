import {Routes, Route} from 'react-router-dom';
import POS from './pages/POS';
import Login from './pages/LoginPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';

function App(){
  return (
    <>
      <Navbar />
    <Routes>
      <Route path="/" element={<PrivateRoute/>}>
        <Route path="/" element={<POS />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default App;