import { Navigate, Route, Routes ,useNavigate } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Layout from "./Components/Layout/Layout"
import ProtectedRoute from "./Routes/ProtectedRoute"
import Nuse from "./Pages/Nuse"
import Admin from "./Pages/Admin"
import useAuth from "./Hook/authUser/useAuth"

function App() {

   const { auth } = useAuth();


  let defaultRedirect = <Navigate to="/login" replace />; 

  if (auth?.rols === "Admin") {
    defaultRedirect = <Navigate to="/admin" replace />;
  } else if (auth?.rols === "Authenticated") {
    defaultRedirect = <Navigate to="/nuse" replace />;
  }
  

  return (
    <>
     <Routes >
        <Route path="/" element={<Layout/>}>

        <Route index element={defaultRedirect} />

          <Route path="login"  element={<Login/>}/>
          <Route path="sign-up"  element={<Register/>}/>


        <Route element={<ProtectedRoute allowedRoles="Authenticated"/>} >
          <Route path="nuse" element={<Nuse/>}/>
        </Route>

        <Route element={<ProtectedRoute allowedRoles="Admin"/>} >
          <Route path="admin" element={<Admin/>}/>
        </Route>

        </Route>
     </Routes>
    </>
  )
}

export default App
