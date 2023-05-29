import Login from "./components/Login";
import Main from "./components/Main";
import GoDutch from "./components/GoDutch";
import './index.css'
import{ BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}> </Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/goDutch" element={<GoDutch />}></Route>
      </Routes>
    </BrowserRouter>

    // <div className="wave-bg">
    //   <Login/>
    // </div>
  );
}

export default App;
