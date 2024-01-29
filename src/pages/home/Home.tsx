import { useState } from "react";
import EmptyImage from "./components/EmptyImage";
import InputKeyword from "./components/InputKeyword";

const Home = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[70%] bg-white rounded-b-xl rounded-tr-xl flex flex-col items-center justify-center py-[30px]">
        <div className="text-[24px]">Image Generator</div>
        {imageUrl ? (
          <div className="w-full flex items-center justify-center py-7">
            <img src={imageUrl} style={{ borderRadius: "6px" }} />
          </div>
        ) : (
          <EmptyImage />
        )}
        <InputKeyword setImageUrl={setImageUrl} />
      </div>
    </div>
  );
};

export default Home;
