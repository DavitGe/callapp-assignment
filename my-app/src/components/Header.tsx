import React, { useState } from "react";
import styled from "styled-components";
import NewPerson from "./NewPerson";

import { Link } from "react-router-dom";

const Header = (): JSX.Element => {
  const [modal, setModal] = useState(false);

  const toggle = (): void => setModal(!modal);

  return (
    <Wrapper>
      <NewPerson modal={modal} toggle={toggle} />
      <HeaderContainer>
        <TextContainer>
          <Title>Statistic Management</Title>
          <SubTitle>
            Manage all your existing people statistics or add new people.
          </SubTitle>
        </TextContainer>
        <Button onClick={toggle}>Add New Person</Button>
      </HeaderContainer>
      <LinksContainer>
        <StyledLink to="/">Table</StyledLink>
        <StyledLink to="/chart">Pie Chart</StyledLink>
      </LinksContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 12px;
`;
const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  gap: 24px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #d0c2f7;
  font-size: 24px;
  font-weight: 600;
  transition: 0.2s;
  &:hover {
    color: #101010;
  }
`;
const HeaderContainer = styled.div`
  max-width: 100%;
  color: #101010;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin: 0;
`;

const SubTitle = styled.span`
  opacity: 0.5;
  font-size: 16px;
  margin-top: 8px;
`;

const Button = styled.button`
  background-color: #101010;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #f6f5f2;
  padding: 12px 24px;
  cursor: pointer;
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

export default Header;
