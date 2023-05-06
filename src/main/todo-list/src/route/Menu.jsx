import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./css/Menu.module.css";


const Menu = () => {
  return (
    <div className={styles.menu}>
      <Link to={"/"}><h3>메인</h3></Link>
      <Link to={"/todo"}><h3>Todo 리스트</h3></Link>
      <Link to={"/users/login"}><h3>로그인</h3></Link>
      <Link to={"/users/join"}><h3>회원가입</h3></Link>
      <Link to={"/mypage"}><h3>내정보</h3></Link>
    </div>
  );
}

export default Menu;