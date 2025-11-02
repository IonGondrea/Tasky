// src/main.tsx
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>   // poți activa când vrei
    <App />
    // </React.StrictMode>
)
