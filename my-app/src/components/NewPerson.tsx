import React, { useState } from "react";
import validator from "validator";
import { User } from "../model/User";
import { useUserStore } from "../usersStore";

import {
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import styled from "styled-components";

interface props {
  modal: boolean;
  toggle: () => void;
}

const NewPerson = ({ modal, toggle }: props): JSX.Element => {
  const { addUser, users, length } = useUserStore((state) => ({
    addUser: state.addUser,
    users: state.users,
    length: state.users.length,
  }));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");

  const [error, setError] = useState({
    name: false,
    email: false,
    phone: false,
    city: false,
    street: false,
  });

  const reset = () => {
    setError({
      name: false,
      email: false,
      phone: false,
      city: false,
      street: false,
    });
    setName("");
    setEmail("");
    setPhone("+");
    setCity("");
    setStreet("");
    setGender("male");
  };

  //validations
  const validateEmail = () => {
    if (validator.isEmail(email)) {
      setError({ ...error, email: false });
    } else {
      setError({ ...error, email: true });
    }
  };

  const validateText = (str: string): boolean => {
    return /[a-zA-Z]/.test(str);
  };

  const validateEmpty = (): boolean => {
    const result = {
      name: !validateText(name),
      email: !validator.isEmail(email),
      phone: phone.length < 10,
      city: !validateText(city),
      street: !validateText(street),
    };
    setError(result);
    return !(
      result.name ||
      result.email ||
      result.phone ||
      result.city ||
      result.street
    );
  };

  //handlers
  const nameInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const result = e.currentTarget.value.replace(/[^a-zA-Z ]/gi, "");
    setName(result);
  };

  const emailInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    validateEmail();
    setEmail(e.currentTarget.value);
  };
  const phoneInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const result = e.currentTarget.value.replace(/\D/g, "");
    setPhone("+" + result);
  };
  const cityInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const result = e.currentTarget.value.replace(/[^a-zA-Z ]/gi, "");
    setCity(result);
  };
  const streetInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setStreet(e.currentTarget.value);
  };
  const genderInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (
      e.currentTarget.value === "male" ||
      e.currentTarget.value === "female"
    ) {
      setGender(e.currentTarget.value);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (validateEmpty()) {
      //save
      try {
        const user: User = {
          id: String(Number(users[length - 1].id) + 1),
          name: name,
          email: email,
          gender: gender,
          phone: phone,
          address: {
            city: city,
            street: street,
          },
        };
        addUser(user);
      } catch (error) {
        alert(error);
      }

      //ending
      reset();
      toggle();
    }
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      keyboard
      backdrop
      centered
      onSubmit={submitHandler}
    >
      <ModalHeader>Add Person To List</ModalHeader>
      <Form className="p-3">
        <FormGroup className="position-relative">
          <StyledLabel for="name">Name</StyledLabel>
          <StyledInput
            name="name"
            placeholder="Jonathan Lopez"
            type="text"
            value={name}
            onChange={nameInputHandler}
            invalid={error.name}
          />
          <FormFeedback tooltip>Fill the gap!</FormFeedback>
        </FormGroup>
        <FormGroup className="position-relative">
          <StyledLabel for="email">E-Mail</StyledLabel>
          <StyledInput
            name="email"
            placeholder="example@gology.com"
            type="email"
            value={email}
            onChange={emailInputHandler}
            invalid={error.email}
          />
          <FormFeedback tooltip>Please enter valid Email!</FormFeedback>
        </FormGroup>
        <FormGroup className="position-relative">
          <StyledLabel for="phone">Phone Number</StyledLabel>
          <StyledInput
            name="phone"
            placeholder="+1 (234) 567-7890"
            type="text"
            value={phone}
            onChange={phoneInputHandler}
            invalid={error.phone}
          />
          <FormFeedback tooltip>Minimal length should be 10!</FormFeedback>
        </FormGroup>
        <FormGroup className="position-relative">
          <StyledLabel for="city">City</StyledLabel>
          <StyledInput
            name="city"
            placeholder="New York"
            type="text"
            value={city}
            onChange={cityInputHandler}
            invalid={error.city}
          />
          <FormFeedback tooltip>Fill the gap!</FormFeedback>
        </FormGroup>
        <FormGroup className="position-relative">
          <StyledLabel for="street">Street</StyledLabel>
          <StyledInput
            name="street"
            placeholder="Wall Street"
            type="text"
            value={street}
            onChange={streetInputHandler}
            invalid={error.street}
          />
          <FormFeedback tooltip>Fill the gap!</FormFeedback>
        </FormGroup>
        <FormGroup>
          <StyledLabel for="gender">Select</StyledLabel>
          <StyledInput
            name="gender"
            type="select"
            value={gender}
            onChange={genderInputHandler}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </StyledInput>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </Modal>
  );
};

const StyledInput = styled(Input)`
  outline: none;
  border: none;
  background-color: #f6f5f2;
  height: 48px;
  font-size: 14px;
  &::placeholder {
    opacity: 0.7;
  }
  &:focus {
    outline: ${(props) =>
      props.invalid ? "outline: 2px solid #d04243" : "2px solid #e3d890"};

    border: none;
    box-shadow: none;
  }
  ${(props) => props.invalid && "outline: 2px solid #d04243"}
`;

const StyledLabel = styled(Label)`
  font-size: 14px;
  font-weight: 600;
`;

const Button = styled.button`
  width: 100%;
  background-color: #d04243;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #f6f5f2;
  padding: 12px 0;
  cursor: pointer;
  margin-top: 24px;
  transition: 0.2s;
  &:hover {
    opacity: 0.8;
    transition: 0.2s;
  }
  &:active {
    transition: 0.2s;
    opacity: 1;
  }
`;

export default NewPerson;
