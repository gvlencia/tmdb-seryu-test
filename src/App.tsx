import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes';

const App: React.FC = () => (
  <Router>
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="mt-10 sm:mt-20">
        <AppRoutes />
      </div>
    </div>
  </Router>
);

export default App;
