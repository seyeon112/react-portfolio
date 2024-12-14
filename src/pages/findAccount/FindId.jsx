import React, { useState } from "react";
import { Link } from "react-router-dom";
import S from "./style";

const FindId = () => {

  const [name, setName] = useState(""); // 이름 상태
  const [phoneNumber, setPhoneNumber] = useState(""); // 전화번호 상태
  const [authNumber, setAuthNumber] = useState(""); // 인증번호 상태
  const [generatedAuthNumber, setGeneratedAuthNumber] = useState(""); // 서버에서 받은 인증번호
  const [attempts, setAttempts] = useState(0); // 인증 시도 횟수
  const [isBlocked, setIsBlocked] = useState(false); // 인증 횟수 초과 여부
  const [allCheck, setAllCheck] = useState(false); // 전체 확인 여부


  const transferSms = async () => {
    if (!phoneNumber) {
      return alert("휴대폰 번호를 입력해주세요.");
    }

    await fetch("http://localhost:10000/member/sms/find-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memberPhone: phoneNumber }), 
    })
      .then((res) => res.json())
      .then((data) => {
        setGeneratedAuthNumber(data.verificationCode);
        alert("인증번호를 발송했습니다.");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("인증번호 전송 실패");
      });
  };

  // 인증번호 확인
  const testCode = "123456";
  const confirmVerificationCode = () => {
    if (isBlocked) {
      return alert("인증 시도 횟수를 초과했습니다. 다시 시도해주세요.");
    }

    if (authNumber === testCode) {
      alert("인증번호가 일치합니다.");
      setAttempts(0);
      setIsBlocked(false);
      setAllCheck(true);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        alert("인증횟수를 초과했습니다. 다시 입력해주세요.");
        setAuthNumber("");
        setAttempts(0);
        setIsBlocked(true);
      } else {
        setAllCheck(false);
        alert(`인증번호가 일치하지 않습니다. (${newAttempts}/3)`);
      }
    }
  };

  return (
    <>
      <S.InputContainer>
        <S.LogoBox>
          <S.LogoWrap>
            <Link to={"/"}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/layout/logo.png`}
                alt="로고"
              />
            </Link>
          </S.LogoWrap>
        </S.LogoBox>

        <S.InputWrapper>
          <S.Label htmlFor="name">이름</S.Label>
          <S.Input
            type="text"
            id="name"
            name="name"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </S.InputWrapper>

        <S.AuthNumberContainer>
          <S.InputWrapper>
            <S.Label htmlFor="phone">휴대폰 번호</S.Label>
            <S.Input
              type="text"
              id="phone"
              name="phone"
              placeholder="전화번호"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <S.AuthButton type="button" onClick={transferSms}>
              인증요청
            </S.AuthButton>
          </S.InputWrapper>
        </S.AuthNumberContainer>

        <S.AuthNumberContainer>
          <S.InputWrapper>
            <S.Label htmlFor="authNumber">인증번호</S.Label>
            <S.Input
              type="text"
              id="authNumber"
              name="authNumber"
              placeholder="인증번호"
              value={authNumber}
              onChange={(e) => setAuthNumber(e.target.value)}
            />
            <S.AuthButton type="button" onClick={confirmVerificationCode}>
              확인
            </S.AuthButton>
          </S.InputWrapper>
        </S.AuthNumberContainer>

        <Link to="/find/find-complete">
          <S.NextButton type="button" disabled={!allCheck}>
            다음
          </S.NextButton>
        </Link>
      </S.InputContainer>
    </>
  );
};

export default FindId;
