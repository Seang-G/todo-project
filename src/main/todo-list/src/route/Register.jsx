import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./css/Register.module.css";

import Input from "./css/component/Input"
import Button from "./css/component/Button"
import Loading from "./css/component/Loading";

const Register = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [pwC, setPwC] = useState("");
  const [email, setEmail] = useState("");

  const [pwStr, setStr] = useState("");
  const [pwCStr, setPwCStr] = useState("");
  const [isPwSame, setIsPwSame] = useState(false);

  const [loading, setLoading] = useState(false);

  const handlers = {
    onChangeId:(e) => setId(e.target.value),
    onChangeName:(e) => setName(e.target.value),
    onChangePwC:(e) => setPwC(e.target.value),
    onChangeEmail:(e) => setEmail(e.target.value),

    onChangePw(e) {
      if (e.target.value.length < 8) {
        setStr("비밀번호는 8자리 이상으로 구성해주세요.");
        setPw(e.target.value);
        setIsPwSame(false);
      } else if (e.target.value.length > 20) {
        setStr("비밀번호는 20자리 이하로 구성해주세요.");
        setIsPwSame(false);
      } else {
        // 영문자 숫자 조합 확인과정 필요
        setStr("");
        setPw(e.target.value);
      }
    },

    checkIdDup(e) {
      e.preventDefault();
      console.log("아직 구현X")
    },

    async submit (e) {
      e.preventDefault();
      setLoading(true)
      if(isPwSame){
        try{
          const res = await axios.post("/api/v1/user/join", {
            loginId: id,
            loginPw: pw,
            loginPwCheck: pwC,
            userName: name,
            userEmail: email
          });

          window.location.href = "/user/login";
          setLoading(false)
        } catch (err) {
          switch (err.response.status){
            case 409:
              alert("아이디가 이미 존재합니다.");
              break;
            default:
              alert("오?류");
          }
          setLoading(false)
        }
      } else {
        alert("비밀번호가 바르지 않습니다.")
        setLoading(false)
      }
    }
  }

  useEffect(()=>{
    if (pwC.length>=8) {
      if (pwC!==pw) {
        setPwCStr("비밀번호가 일치하지 않습니다.");
        setIsPwSame(false);
      } else {
        setPwCStr("비밀번호가 일치합니다.");
        setIsPwSame(true);
      }
    } else {
      setPwCStr("");
      setIsPwSame(false);
    }
  }, [pw, pwC])

  return (
    <div className={styles.register}>
      <form action="">
        {/* <label htmlFor="id">아이디</label>
        <input type="text" id="id" onChange={handlers.onChangeId} value={id} /> */}
        <Input
          id="id"
          label="아이디"
          onChange={handlers.onChangeId}
          value={id}
        />
        <Button
          text={"중복확인"}
          onClick={handlers.checkIdDup}
        />
        <br />

        {/* <label htmlFor="name">이름</label>
        <input type="text" id="name" onChange={handlers.onChangeName} value={name} /> */}
        <Input
          id="name"
          label="이름"
          onChange={handlers.onChangeName}
          value={name}
        />
        <br />

        {/* <label htmlFor="pw">비밀번호</label>
        <input type="password" id="pw" onChange={handlers.onChangePw} value={pw} /> */}
        <Input
          id="pw"
          type="password"
          label="비밀번호"
          onChange={handlers.onChangePw}
          value={pw}
        />
        {pwStr}
        <br />

        {/* <label htmlFor="pwC">비밀번호 확인</label>
        <input type="password" id="pwC" onChange={handlers.onChangePwC} value={pwC} /> */}
        <Input
          id="pwC"
          type="password"
          label="비밀번호 확인"
          onChange={handlers.onChangePwC}
          value={pwC}
        />
        {pwCStr}
        <br />

        {/* <label htmlFor="email">이메일</label>
        <input type="text" id="email" onChange={handlers.onChangeEmail} value={email} /> */}
        <Input
          id="email"
          label="이메일"
          onChange={handlers.onChangeEmail}
          value={email}
        />
        {/* <Button
          text={"인증"}
        />*/}
        <br />
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            width: "50%"
          }}
        >
          {loading?
            <Loading />:
            <Button
              text={"가입"}
              onClick={handlers.submit}
            />
          }
        </span>
        
      </form>
    </div>
  );
}

export default Register;