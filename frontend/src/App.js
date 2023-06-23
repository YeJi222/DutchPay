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
        <Route path="/confirm:id" element={<GoDutch />}></Route> {/* /goDutch:id에서 :id는 동적으로 변하는 부분 */}
      </Routes>
    </BrowserRouter>

    // <div className="wave-bg">
    //   <Login/>
    // </div>
  );
}

export default App;
