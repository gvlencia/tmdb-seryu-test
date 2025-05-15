// src/routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WatchList from './pages/WatchList';
import Favorite from './pages/Favorite';
import Detail from './pages/Detail';
import PrivateRoute from './components/PrivateRoute'
import Auth from './pages/Auth';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/watchlist" element={
      <PrivateRoute>
         <WatchList />
      </PrivateRoute>
      } />
    <Route path="/favorite" element={
      <PrivateRoute>
        <Favorite />
      </PrivateRoute>
      } />
    <Route path="/detail/:id" element={<Detail />} />
  </Routes>
);

export default AppRoutes;