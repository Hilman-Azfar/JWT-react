import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const StyledTabs = styled.ol`
  padding-left: 0;
  margin: 0;
  border-bottom: 1px solid ${({theme}) => theme.colors.blue};
`;

const StyledTab = styled.li`
  display: inline-block;
  min-width: 50%;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;

  background: ${({activeTab, theme}) => activeTab ? theme.colors.pink : theme.colors.blue};
  border: solid ${({activeTab, theme}) => activeTab ? theme.colors.blue : "transparent"};
  border-width: 1px 1px 0 1px;
`;

const StyledTabContent = styled.div`
  padding: 10px;
  background: ${({theme}) => theme.colors.pink};
`;

function Tab({label, activeTab, onClick}) {
  const clickHandler = () => {
    onClick(label);
  }

  return (
    <StyledTab onClick={clickHandler} activeTab={activeTab}>
      { label }
    </StyledTab>
  )
}

export default function Tabs({children, getActive}) {
  const [activeTab, setActiveTab] = useState(children[1].props.label)

  const onClickTabItem = (tab) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    if (getActive !== null) {
      getActive(activeTab)
    }
  }, [activeTab, getActive])

  return (
    <div>
      <StyledTabs>
        {
          children.map(child => {
            const { label } = child.props;
            return (
              <Tab
                activeTab={activeTab===label}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            )
          })
        }
      </StyledTabs>
      <StyledTabContent>
        {
          children.filter(child => {
            return child.props.label === activeTab;
          })
        }
      </StyledTabContent>
    </div>
  )
}

Tabs.defaultProps = {
  getActive: null
}