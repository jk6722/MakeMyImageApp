import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetChangeHandler } from "../../../hooks/useGetChangeHandler";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../../../recoil/UserAtom";
import { useGetEnterHandler } from "../../../hooks/useGetEnterHandler";

const Login = () => {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setUserInfo = useSetRecoilState(UserAtom);

  const handleChangeId = useGetChangeHandler(setLoginId);
  const handleChangePw = useGetChangeHandler(setPassword);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loginId.length === 0 || password.length === 0) return;

    const serverUrl = import.meta.env.VITE_SERVER_URL + "/auth/login";
    fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginId,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 1000) {
          setUserInfo({
            loginId: res?.result?.loginId,
            email: res?.result?.email,
          });
          navigate("/");
        }
      });
  };

  const handleKeyDown = useGetEnterHandler(handleLogin);

  return (
    <div className="flex flex-col gap-[20px] my-auto">
      <div className="w-[500px] h-auto bg-white rounded-md self-center flex items-center justify-center flex-col px-3 pt-5">
        <div className="text-[20px] mb-3">Log into your account</div>
        <input
          type="text"
          className="w-full px-3 py-3 border-b-2 focus:outline-none"
          placeholder="Enter Your ID"
          onChange={handleChangeId}
        />
        <input
          type="text"
          className="w-full px-3 py-3 border-b-2 focus:outline-none"
          placeholder="Enter Your Password"
          onChange={handleChangePw}
          onKeyDown={handleKeyDown}
        />
        <Link
          to="/auth/signup"
          className="self-start py-3 px-3 underline text-blue-500"
        >
          signup
        </Link>
      </div>
      <button
        className="w-full bg-purple-500 py-[10px] rounded-md hover:bg-purple-600"
        onClick={handleLogin}
      >
        <span className="text-[white]">Login</span>
      </button>
    </div>
  );
};

export default Login;
