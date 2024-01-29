import { RiAiGenerate } from "react-icons/ri";

const EmptyImage = () => {
  return (
    <div className="w-full px-5 py-10 flex items-center justify-center flex-col">
      <div>키워드를 통해 이미지를 생성해 보세요!</div>
      <div className="text-[100px] px-10 py-20">
        <RiAiGenerate />
      </div>
    </div>
  );
};

export default EmptyImage;
