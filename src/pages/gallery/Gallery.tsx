import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../recoil/UserAtom";
import { ImageType } from "../../types/image";
import { MdDelete } from "react-icons/md";
import Loading from "../../components/Loading";

const Gallery = () => {
  const userInfo = useRecoilValue(UserAtom);
  const [userImages, setUserImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo.loginId === "") return;
    const serverUrl =
      import.meta.env.VITE_SERVER_URL +
      "/api/image/" +
      userInfo.loginId +
      "/images";
    setIsLoading(true);
    fetch(serverUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setUserImages(res?.imageList);
      })
      .finally(() => setIsLoading(false));
  }, [userInfo.loginId]);

  const handleDelete = useCallback((id: number) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL + "/api/image/" + id;
    setIsLoading(true);
    fetch(serverUrl, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          setUserImages((prev) => prev.filter((image) => image.imageId !== id));
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[70%] relative bg-white rounded-b-xl rounded-tr-xl flex flex-col items-center justify-center py-[30px]">
        <div className="text-[24px]">Gallery</div>
        {isLoading && (
          <div className="py-20 flex items-center justify-center">
            <Loading />
          </div>
        )}
        <div className="flex justify-start flex-wrap gap-[1.25%] px-5 pt-5">
          {userImages.length > 0 &&
            userImages.map((image) => (
              <div
                className={`w-[32.5%] mb-[1%] ${
                  image.url && "bg-blue-100"
                } p-2 rounded-md relative`}
                key={image?.imageId}
              >
                <img className="rounded-md" src={image?.url} />
                <div className="w-full flex items-center justify-center py-1 text-gray-700 font-bold">
                  <span>{image?.keyword}</span>
                </div>
                <div
                  className="absolute right-3 top-3 text-[20px] rounded-full p-2 bg-slate-300 hover:scale-[120%] cursor-pointer"
                  onClick={() => handleDelete(image.imageId)}
                >
                  <MdDelete />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
