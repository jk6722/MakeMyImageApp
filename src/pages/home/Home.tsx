import { useState } from "react";
import EmptyImage from "./components/EmptyImage";
import InputKeyword from "./components/InputKeyword";
import Loading from "../../components/Loading";

const Home = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[70%] relative bg-white rounded-b-xl rounded-tr-xl flex flex-col items-center justify-center py-[30px]">
        <div className="text-[24px]">Image Generator</div>
        {isLoading && <Loading />}
        {imageUrl ? (
          <div className="w-[470px] flex items-center justify-center py-7">
            <img src={imageUrl} style={{ borderRadius: "6px" }} />
          </div>
        ) : (
          <EmptyImage />
        )}
        <InputKeyword setImageUrl={setImageUrl} setIsLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default Home;
