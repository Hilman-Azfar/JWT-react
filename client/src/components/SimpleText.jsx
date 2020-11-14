import React, { useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import styled from 'styled-components';

export default function SimpleText({sendMessage}) {
  const [picker, togglePicker] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Simple>
      {
        picker 
        ? (
          <><p>😄</p><ModalCont setValue={setValue} togglePicker={togglePicker}/></>
        )
        : <p onClick={() => togglePicker(true)}>😄</p>
      }
      <StyledInput rows="3" value={value} onChange={e=>setValue(e.target.value)}/>
      <StyledButton onClick={
        // send somewhere
        () => {
          sendMessage(value);
          setValue('');
        }
      }>
        Send
      </StyledButton>
    </Simple>
  )
}


const ModalCont = ({togglePicker, setValue}) => {
  return (
    <>
    <CloseLayer onClick={() => togglePicker(false)}/>
    <Modal>
      <Picker onSelect={(em) => {
        setValue(val => val + em.native)
        togglePicker(false)
      }}/>
    </Modal>
    </>
  )
}

const StyledButton = styled.button`
  height: 4rem;
  margin: 2px 5px 2px 0;
`;

const StyledInput = styled.textarea`
  flex: auto;
  height: 4rem;
  resize: none;
  margin: 2px 5px 2px 0;
`;

const CloseLayer = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

const Simple = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  > p {
    font-size: 2rem;
    margin: 0 10px;
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transform: translateY(-100%);
`;
