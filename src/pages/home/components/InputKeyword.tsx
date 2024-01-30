import { useState } from "react";
import { useGetChangeHandler } from "../../../hooks/useGetChangeHandler";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../../recoil/UserAtom";
import { useGetEnterHandler } from "../../../hooks/useGetEnterHandler";

const InputKeyword = ({
  setImageUrl,
  setIsLoading,
}: {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const userInfo = useRecoilValue(UserAtom);
  const [keyword, setKeyword] = useState<string>("");
  const handleChangeKeyword = useGetChangeHandler(setKeyword);

  const handleGenerateImage = () => {
    if (userInfo.loginId === "") {
      window.alert("로그인 후 이용이 가능합니다");
      return;
    }
    if (keyword.length === 0) return;
    const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/image";
    setIsLoading(true);
    fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword,
        loginId: userInfo.loginId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 1000) {
          setImageUrl(res?.result?.url);
          setKeyword("");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleKeyDown = useGetEnterHandler(handleGenerateImage);

  return (
    <div className="w-full flex gap-[20px] justify-center">
      <input
        type="text"
        className="w-[25%] px-3 py-2 focus:outline-none border-b-2 box-border"
        placeholder="ex) cat, sleepy, shiny"
        onChange={handleChangeKeyword}
        onKeyDown={handleKeyDown}
      />
      <button
        className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
        onClick={handleGenerateImage}
      >
        <span className="text-[white]">Generate</span>
      </button>
    </div>
  );
};

export default InputKeyword;
