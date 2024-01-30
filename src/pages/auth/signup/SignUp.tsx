import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetChangeHandler } from "../../../hooks/useGetChangeHandler";
import Loading from "../../../components/Loading";

const SignUp = () => {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const naviagte = useNavigate();

  const handleChangeId = useGetChangeHandler(setLoginId);
  const handleChangePw = useGetChangeHandler(setPassword);

  const handleSignUp = async () => {
    if (loginId.length === 0 || password.length === 0) return;
    setIsLoading(true);
    const serverUrl = import.meta.env.VITE_SERVER_URL + "/auth/signup";
    fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginId,
        password,
        email: `${loginId}@kusitms.com`,
      }),
    })
      .then((res) => {
        if (res.status === 200) naviagte("/auth/login");
      })
      .finally(() => setIsLoading(false));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      handleSignUp();
    }
  };

  return (
    <div className="flex flex-col gap-[20px] my-auto">
      <div className="w-[500px] h-auto bg-white rounded-md self-center flex items-center justify-center flex-col px-3 py-5">
        {isLoading && <Loading />}
        <div className="text-[20px] mb-3">Sign Up</div>
        <input
          type="text"
          value={loginId}
          className="w-full px-3 py-3 border-b-2 focus:outline-none"
          placeholder="Enter Your New ID"
          onChange={handleChangeId}
        />
        <input
          type="text"
          value={password}
          className="w-full px-3 py-3 border-b-2 focus:outline-none"
          placeholder="Enter Your New Password"
          onChange={handleChangePw}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        className="w-full bg-purple-500 py-[10px] rounded-md hover:bg-purple-600"
        onClick={handleSignUp}
      >
        <span className="text-[white]">Create</span>
      </button>
    </div>
  );
};

export default SignUp;
