import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'
import { ReactComponent as BannerIcon } from '../assets/svg/status_update.svg'

const Wrapper = styled.div`
  width: 100%;

  section:nth-child(even) {
    background: ${({theme}) => theme.colors.lightgrey};
  }

  section:nth-child(3) {
    background: ${({theme}) => theme.colors.blue};
  }

  section:nth-child(5) {
    background: ${({theme}) => theme.colors.purple};
  }
`;

const BannerSection = styled.section`
  height: 100vh;

  @media ${({theme}) => theme.media.pc} {
    height: 70vh;
  }
`;

const StyledSection = styled.section`
  height: 90vh;

  @media ${({theme}) => theme.media.pc} {
    height: 60vh;
  }
`;

const BannerTitle = styled.h1`
  font-size: 3.7rem;
  font-weight: 300;
  margin: 1.4em 0 0 0;

  @media ${({theme}) => theme.media.pc} {
    font-size: 5rem;
    margin: 1em 0;
  }
`;

const Text = styled.p`
  font-size: ${({theme}) => theme.fontSizes.text};
  line-height: ${({theme}) => theme.fontSizes.text};
  margin: 0 0 40px 0;
`;

const CallToAction = styled(Link)`
  min-width: 80px;
  background: ${({theme}) => theme.colors.lightgrey};
  font-size: ${({theme}) => theme.fontSizes.text};
  line-height: ${({theme}) => theme.fontSizes.text};
  padding: 0.7em;
  margin: 0 10px;
  display: inline-block;
  opacity: 0.8;
  border-radius: ${({theme}) => theme.radius.sm};
`;

const IconWrapper = styled.div`
  height: 200px;
  width: 75%;
  margin: 40px auto 45px auto;
`;

const ScrollContainer = styled.div`
  margin: 45px auto 10px auto;
  width: max-content;
`;

const ScrollPath = styled.div`
  height: 52px;
  width: 22px;
  background: ${({theme}) => theme.colors.purple};
  border: 1px solid ${({theme}) => theme.colors.blue};
  border-radius: 50px;
`;

const scrollUp = keyframes`
  0% {
    transform: translatey(150%);
  }

  7% {
    transform: translatey(0);
  }
  
  35% {
    transform: translatey(0);
  }
  
  45% {
    transform: translatey(150%);
  }

  100% {
    transform: translatey(150%);
  }
  
`; 

const ScrollIndicator = styled.div`
  height: 20px;
  width: 20px;
  background: ${({theme}) => theme.colors.lightgrey};
  border: 1px solid ${({theme}) => theme.colors.lightgrey};
  border-radius: 50px;

  transform: translatey(150%);
  animation: 5s ${scrollUp} ease-out infinite;
`;

export default function Landing() {
  return (
    <Wrapper>
      <BannerSection>
        <BannerTitle>
          Chatterbox
        </BannerTitle>
        <Text>
          Connect and expand your network.
        </Text>
        <IconWrapper>
          <BannerIcon width='100%' height='100%'/>
        </IconWrapper>
        <CallToAction to='/login'>
          Log in
        </CallToAction>
        <CallToAction to='/register'>
          Join for Free!
        </CallToAction>
        <CallToAction>
          Learn more
        </CallToAction>
        <ScrollContainer>
          <ScrollPath>
            <ScrollIndicator />
          </ScrollPath>
        </ScrollContainer>
        <Text>
          Scroll Down
        </Text>
      </BannerSection>
      <StyledSection>
        Step one: create account
      </StyledSection>
      <StyledSection>
        Step two: connect / send links / qr
      </StyledSection>
      <StyledSection>
        Step three: chat direct or create groups
      </StyledSection>
      <StyledSection>
        Step four: ???
      </StyledSection>
    </Wrapper>
  )
}
