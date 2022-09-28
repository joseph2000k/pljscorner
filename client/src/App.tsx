import { Routes, Route } from "react-router-dom";
import POS from "./pages/POS";
import Login from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/routing/PrivateRoute";
import Items from "./pages/Items";
import Category from "./pages/Category";
import ReceiptPage from "./pages/ReceiptPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<POS />} />
          <Route path="/items" element={<Items />} />
          <Route path="/category" element={<Category />} />
          <Route path="/receipts" element={<ReceiptPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
