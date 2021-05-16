import React from 'react'

import { EDEV } from '@bdevg/ev';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
const App = () => {
  return <EDEV getMd={(md)=>console.log()} 
    getTitle={(title)=>console.log(title)}
  />
}

export default App
