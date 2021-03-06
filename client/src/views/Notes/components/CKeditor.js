import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'
import colors from '@colors'

export const TextEditor = () => {
  const config = {
    fontColor: {
      colors: [{ color: 'white', label: 'White' }],
    },
  }

  return (
    <div style={{ height: 100 }} className="textEditor">
      <CKEditor
        editor={BalloonEditor}
        data="<p>Enter your text here idiot</p>"
        config={config}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('CKEditor is ready to use!', editor)
        }}
      />
    </div>
  )
}

/*
onChange={(event, editor) => {
          const data = editor.getData()
          console.log({ event, editor, data })
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor)
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
        }}
*/
