import React from 'react'
import styled, { injectGlobal } from 'styled-components'

class Application extends React.Component {
  render () {
    return (
      <Wrapper>
        <Sidebar>
          <Logo>
            <h1>Qalendar</h1>
          </Logo>
          <NavigationList>
            <NavigationCategory>
              HOWTO
            </NavigationCategory>
            <NavigationEntry>
              Install
            </NavigationEntry>
            <NavigationEntry>
              Contribute
            </NavigationEntry>
            <NavigationCategory>
              Examples
            </NavigationCategory>
            <NavigationEntry>
              Basic
            </NavigationEntry>
            <NavigationEntry>
              Advanced
            </NavigationEntry>
            <NavigationCategory>
              API
            </NavigationCategory>
            <NavigationEntry>
              Calendar
            </NavigationEntry>
            <NavigationEntry>
              Event
            </NavigationEntry>
          </NavigationList>
        </Sidebar>
        <Content />
      </Wrapper>
    )
  }
}

injectGlobal`
  html, body, #root {
    margin: 0;
    padding: 0;
    font-weight: 400;
  }

  * {
    font-family: 'Roboto', sans-serif;
  }
`

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`

const Sidebar = styled.div`
  flex: 0 1 250px;
  background: #f4f4f4;
`

const Logo = styled.div`
  height: 70px;
  background: #3498DB;
  display: flex;
  align-items: center;
  h1 {
    margin: auto;
    color: white;
    text-transform: uppercase;
    font-size: 16px;
  }
`

const NavigationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const NavigationCategory = styled.li`
  display: block;
  padding: 0 32px 4px;
  padding-top: 32px;
  color: #939da3;
  font-size: 13px;
  line-height: 18px;
  text-transform: uppercase;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
`

const NavigationEntry = styled.li`
  display: block;
  color: #555;
  padding: 6px 32px;
  font-size: 12px;
  font-weight: 300;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const Content = styled.div`
  padding: 16px;
  flex: 1 0 auto;
  background: #fdfdfd;
  color: black
`

export default Application
