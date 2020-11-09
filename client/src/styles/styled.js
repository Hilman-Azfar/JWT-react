import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: calc(100% - 20px);
  min-height: 380px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.9);
  border-radius: ${({theme}) => theme.radius.md};
  padding: 42px 42px;

  @media ${({theme}) => theme.media.pc} {
    position: static;
    transform: translate(0, 0);
    margin: 120px auto;
    max-width: 360px;
  }
`;

export default Wrapper