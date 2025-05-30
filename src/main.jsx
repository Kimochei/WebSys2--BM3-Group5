import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactQuiz from './ReactQuiz.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactQuiz />
  </StrictMode>,
)
