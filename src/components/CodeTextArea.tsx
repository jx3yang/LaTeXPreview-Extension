import styled from 'styled-components'

export const CodeTextArea = styled.textarea`
  font-family: Menlo, Monaco, Courier New, monospace;
  font-size: 14px;
  color: white;
  width: 100%;
  height: 100%;
  resize: none;
  overflow: auto;
  padding: 0px;
  border: none;
  background-color: #292A2D;
  :focus {
    outline: none;
  }
`
