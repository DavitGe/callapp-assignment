import create from "zustand";
import { User } from "./model/User";

interface UserState {
  users: User[];
  setUsers: (data: User[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  // initial state
  users: [],
  //methods
  setUsers: (data: User[]) => {
    set(() => ({
      users: [...data],
    }));
  },
}));
