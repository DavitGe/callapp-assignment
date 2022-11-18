import create from "zustand";
import { User } from "./model/User";

interface UserState {
  users: Array<User>;
  setUsers: (data: User[]) => void;
  addUser: (user: User) => void;
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
  addUser: (user: User) => {
    set((state) => ({
      users: [...state.users, user],
    }));
  },
}));
