import React from 'react';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '../hoc/AuthProvider';
import Header from '../layout/Header';
import Main from '../layout/Main';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
    <AuthProvider>
      <ToastContainer />
      <div className="h-100 d-flex flex-column">
        <Header />
        <Main />
      </div>
    </AuthProvider>
);

export default App;
