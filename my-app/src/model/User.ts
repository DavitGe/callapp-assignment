interface address {
  street: string;
  city: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  gender: "male" | "female";
  phone: string;
  address: address;
}
