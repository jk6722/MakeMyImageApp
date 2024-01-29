import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "persist-atom-key",
  storage: localStorage,
});

export const UserAtom = atom({
  key: "UserAtom",
  default: {
    loginId: "",
    email: "",
  },
  effects_UNSTABLE: [persistAtom],
});
