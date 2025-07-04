import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Markets from './Pages/Markets/Markets';
import Watchlist from './Pages/Markets/WatchList/Watchlist';
import Layout from './LayOut';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Markets />} />
          <Route path="markets" element={<Markets />} />
          <Route path="watchlist" element={<Watchlist />} />
          </Route> 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
