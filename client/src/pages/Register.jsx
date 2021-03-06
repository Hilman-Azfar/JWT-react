import React from 'react'
import styled from 'styled-components'
import { Field, Form, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import Wrapper from '../styles/styled'
import { useAuth } from '../context/auth';

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

export default function Register() {
  let auth = useAuth();
  let history = useHistory();
  return (
    <Wrapper>
      <Title>Let's get started!</Title>
      <Formik 
        initialValues={{
          rgusername: '',
          rgemail: '',
          rgpassword: '',
        }}
        onSubmit={ async (values, actions) => {
          try {
            await auth.register(values);
            await actions.resetForm();
            await history.push('/login');
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({isSubmitting}) => (
          <StyledForm>
            <Label>Username</Label>
            <StyledField id='rgusername' name='rgusername' placeholder='E.g John smith'/>

            <Label>Email</Label>
            <StyledField id='rgemail' name='rgemail' placeholder='E.g John smith' type='email'/>

            <Label>Password</Label>
            <StyledField id='rgpassword' name='rgpassword' placeholder='E.g John smith' type='password'/>

            <StyledButton type='submit'>Register</StyledButton>
          </StyledForm>
        )}
      </Formik>
      
      <Text>Already have an account?</Text>
      <TextLink to='/login'>Log in here!</TextLink>

    </Wrapper>
  )
}
