import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./route/css/App.module.css";
import Menu from "./route/Menu";
import Intro from "./route/Intro";
import TodoBase from "./route/TodoBase";
import Login from "./route/Login";
import Register from "./route/Register";
import Mypage from "./route/Mypage"


function App() {

  return (
    <BrowserRouter >
      <div className={styles.app}>
        <Menu />
        <Routes>
          <Route path="/todo/:toDoId" element={<TodoBase />}/>
          <Route path="/" element={<Intro />}/>
          <Route path="/user/login" element={<Login />}/>
          <Route path="/user/join" element={<Register />}/>
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;