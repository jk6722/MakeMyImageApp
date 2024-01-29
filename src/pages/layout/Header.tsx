import { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../recoil/UserAtom";

const Header = () => {
  const [userInfo, setUserInfo] = useRecoilState(UserAtom);
  const navigate = useNavigate();

  const navToLogin = useCallback(() => {
    navigate("/auth/login");
  }, [navigate]);

  const navToGallery = useCallback(() => {
    navigate("/images");
  }, [navigate]);

  const navToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setUserInfo({
      loginId: "",
      email: "",
    });
  }, [setUserInfo]);

  return (
    <div className="w-full flex flex-col">
      <div className="self-end mr-[5%] my-4">
        {userInfo.loginId ? (
          <div className="flex gap-[20px] items-center">
            <span>{userInfo.loginId} 님</span>
            <button
              className="px-4 py-2 rounded-md bg-purple-500 hover:bg-purple-600"
              onClick={handleLogout}
            >
              <span className="text-[white]">Logout</span>
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 rounded-md bg-purple-500 hover:bg-purple-600"
            onClick={navToLogin}
          >
            <span className="text-[white]">Login</span>
          </button>
        )}
      </div>
      <div className="flex mx-[15%]">
        <div
          className="px-4 py-2 bg-green-500 rounded-t-md cursor-pointer hover:bg-green-600"
          onClick={navToHome}
        >
          <span className="text-gray-50">이미지 생성</span>
        </div>
        <div
          className="px-4 py-2 bg-yellow-500 rounded-t-md cursor-pointer hover:bg-yellow-600"
          onClick={navToGallery}
        >
          <span className="text-gray-50">갤러리</span>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
