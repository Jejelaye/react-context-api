import { 
  BrowserRouter, 
  Routes, 
  Route,  
} from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from "./components/Header";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { AuthProvider } from "./features/context/AuthContext";
import { GoalProvider } from "./features/context/GoalContext";


function App() {
  return (
    <AuthProvider>
    <GoalProvider>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>        
        </div>
      </BrowserRouter>
      <ToastContainer />
    </GoalProvider>
    </AuthProvider>
  );
}

export default App;
