import React from 'react'
import styled from 'styled-components'
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import Wrapper from '../styles/styled'

// const Wrapper = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -70%);

//   max-width: 360px;
//   min-height: 380px;
//   margin: 50px auto;
//   background: rgba(255, 255, 255, 0.9);
//   border-radius: ${({theme}) => theme.radius.md};
//   padding: 42px 42px;
// `;


const Title = styled.h1`
  font-weight: 300;
  font-size: ${({theme}) => theme.fontSizes.large};
  line-height: ${({theme}) => theme.fontSizes.large};
`;

const Text = styled.p`
  font-size: ${({theme}) => theme.fontSizes.text};
  line-height: ${({theme}) => theme.fontSizes.text};
  margin: 0;
`;

const TextLink = styled(Link)`
  font-size: ${({theme}) => theme.fontSizes.text};
  line-height: ${({theme}) => theme.fontSizes.text};
  font-weight: bold;
  color: ${({theme}) => theme.colors.pink};
`;

const Label = styled.label`
  font-size: ${({theme}) => theme.fontSizes.label};
  line-height: ${({theme}) => theme.fontSizes.label};
`;

const StyledForm = styled(Form)`
  text-align: left;
  
  > * {
    width: 100%;
    margin: 7px 0;
  }
`;

const StyledField = styled(Field)`
  padding: 0.38em;
  border-radius: ${({theme}) => theme.radius.sm};
  border: 1px solid ${({theme}) => theme.colors.blue};
`;

const StyledButton = styled.button`
  width: 100%;
  margin-top: 28px;
  padding: 0.38em;
  background: ${({theme}) => theme.colors.blue};
  color: white;
  font-weight: bold;
  border: 0;
  border-radius: ${({theme}) => theme.radius.sm};
`;

export default function Login() {
  return (
    <Wrapper>
      <Title>Welcome back!</Title>
      <Formik 
        initialValues={{

        }}
      >
        <StyledForm>
          <Label>Username</Label>
          <StyledField id='si-username' name='si-username' placeholder='E.g John smith'/>

          <Label>Password</Label>
          <StyledField id='si-password' name='si-password' placeholder='E.g John smith'/>

          <StyledButton>Log In</StyledButton>
        </StyledForm>
      </Formik>
      
      <Text>Don't have an account?</Text>
      <TextLink to='/register'>Register here!</TextLink>

    </Wrapper>
  )
}
