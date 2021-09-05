import { useEffect, useState } from 'react'
import domToImage from 'dom-to-image'

export const useNodeClipboard = (timeout: number = 1500) => {
  const [hasCopied, setHasCopied] = useState(false)
  ;(window as any).domToImage = domToImage
  const copyNode = async (node: Node) => {
    const blob = await domToImage.toBlob(node)
    navigator.clipboard.write([
      // @ts-ignore
      new ClipboardItem({
        [blob.type]: blob,
      })
    ])
    .then(() => setHasCopied(true))
    .catch((e) => console.error(e))
  }

  useEffect(() => {
    let timeoutId: number | null = null

    if (hasCopied) {
      timeoutId = window.setTimeout(() => {
        setHasCopied(false)
      }, timeout)
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [hasCopied, timeout])

  return { hasCopied, copyNode }
}
