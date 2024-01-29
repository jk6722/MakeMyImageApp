import { useCallback } from "react";

export const useGetEnterHandler = (handler: () => void) => {
  const handlerEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.code === "Enter") handler();
    },
    [handler]
  );
  return handlerEnter;
};
