import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import {Toaster} from 'react-hot-toast';
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import {useSelector} from 'react-redux'

function App() {
  const {loader} = useSelector(state => state.loaderReducer);

  return (

    <div>
      <Toaster position="top-center" reverseOrder={false} />
      { loader?<Loader/>:<></>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute> }></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
