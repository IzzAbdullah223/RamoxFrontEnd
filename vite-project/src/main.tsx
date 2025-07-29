import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Markets from './Pages/Markets/Markets';
import Watchlist from './Pages/Markets/WatchList/Watchlist';
import Layout from './LayOut';
import TokenInfo from './Pages/Markets/TokenInfo/TokenInfo';
import Chat from './Chat';
import { LanguageProvider } from './LanguageContext';
import { DarkModeProvider } from './DarkModeContext';
import Login from './Login';
import './darkMode.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <DarkModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Markets />} />
              <Route path="markets" element={<Markets />} />
              <Route path="watchlist" element={<Watchlist />} />
              <Route path="token/:tokenId" element={<TokenInfo />} />
               <Route path="Chat" element={<Chat/>} />
       
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </LanguageProvider>
  </StrictMode>
);