import { GlobalContextProvider } from './lib/context.tsx'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
<GlobalContextProvider>
    <App />
    <Toaster />
    </GlobalContextProvider>

)
