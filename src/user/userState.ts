import { atom } from "recoil";
import { User } from "./user.types";

const userState = atom<User | undefined>({
    key: "userState",
    default: undefined,
});

export default userState;