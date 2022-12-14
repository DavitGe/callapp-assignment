import create from "zustand";
import { User } from "./model/User";

interface UserState {
  users: Array<User>;
  setUsers: (data: User[]) => void;
  addUser: (user: User) => void;
  removeUser: (id: String) => void;
  changeUser: (user: User) => void;
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
  removeUser: (id: String) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
  changeUser: (user: User) => {
    set((state) => ({
      users: state.users.map((temp) => {
        if (Number(user.id) === Number(temp.id)) {
          return user;
        } else {
          return temp;
        }
      }),
    }));
  },
}));
