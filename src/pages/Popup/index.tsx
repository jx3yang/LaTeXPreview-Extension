import { useEffect, useRef, useState } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import katex from 'katex'
import { CodeTextArea } from '@/components/CodeTextArea'
import { useNodeClipboard } from '@/hooks/useNodeClipboard'
import { DEFAULT_CODE } from '@/utils/constants'
import { Preview } from '@/components/Preview'
import 'katex/dist/katex.min.css'

const Popup: React.FC = () => {
  const [latexValue, setLatexValue] = useState(DEFAULT_CODE)
  const ref = useRef<HTMLDivElement>(null)
  const renderLaTeX = (tex: string) => {
    if (ref.current) {
      katex.render(tex, ref.current, { displayMode: true, throwOnError: false, output: 'html' })
    }
  }
  const { hasCopied, copyNode } = useNodeClipboard()

  const onCopy = () => {
    const node = ref.current
    if (node) {
      copyNode(node)
    }
  }

  const onChange = (tex: string) => {
    setLatexValue(tex)
    renderLaTeX(tex)
  }

  useEffect(() => {
    renderLaTeX(latexValue)
  }, [])

  return (
    <>
      <CodeContainer>
        <CodeTextArea
          spellCheck={false}
          value={latexValue}
          onChange={(e) => onChange(e.target.value)}
        />
      </CodeContainer>
      <PreviewContainer>
        <CopyButton
          onClick={onCopy}
        >
          {hasCopied ? `copied` : 'copy'}
        </CopyButton>
        <Preview ref={ref} />
      </PreviewContainer>
    </>
  )
}

const CodeContainer = styled.div`
  height: 40%;
  background-color: #292A2D;
  padding: 5px;
`

const PreviewContainer = styled.div`
  padding-top: 4rem;
  height: 40%;
  position: relative;
  font-size: 1.5em !important;
`

const CopyButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  text-transform: uppercase;
`

render(<Popup />, document.getElementById('popup'))
