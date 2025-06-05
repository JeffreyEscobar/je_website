import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove loading placeholder for instant React takeover
const rootElement = document.getElementById("root")!;
rootElement.innerHTML = '';

// Create root and render with performance optimizations
const root = createRoot(rootElement);
root.render(<App />);
