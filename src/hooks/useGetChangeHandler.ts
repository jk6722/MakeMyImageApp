import { useCallback } from "react";

export const useGetChangeHandler = (
  setter: React.Dispatch<React.SetStateAction<string>>
) => {
  const handler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    },
    [setter]
  );
  return handler;
};
