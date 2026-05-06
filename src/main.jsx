import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import { TripPlannerProvider } from '@/context/TripPlannerContext.jsx'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TripPlannerProvider>
    <App />
  </TripPlannerProvider>
)