import { Route, Routes } from "react-router-dom";
import "./App.css";
import React, { useEffect } from 'react';

import {
  Navbar,
  Footer,
  Home,
  Detect,
  Learn,
  Translate,
  NotFound,
  Dashboard,
} from "./components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifyMsg = (type, msg) => {
  if (type === "success") {
    const notify = () => toast.success(msg);
    notify();
  } else {
    const notify = () => toast.error(msg);
    notify();
  }
};

const Layout = ({ children, notifyMsg }) => {
    return (
      <>
        <Navbar notifyMsg={notifyMsg} />
        <div className="main-content">
          {children}
        </div>
        <Footer />
      </>
    );
  };
  
function App() {

    useEffect(() => {
        // Функція для оновлення прогрес-бару
        const updateProgressBar = () => {
          const progressBar = document.querySelector('.scroll-progress-bar');
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPosition = window.scrollY;
          const scrollPercentage = (scrollPosition / scrollHeight) * 100;
          progressBar.style.width = scrollPercentage + '%';
        };
    
        window.addEventListener('scroll', updateProgressBar);
    
        // Очищаємо подію при виході з компонента
        return () => window.removeEventListener('scroll', updateProgressBar);
      }, []);
  
  return (
    <div className="App">
    <div className="scroll-progress-bar"></div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Layout notifyMsg={notifyMsg}>
              <Home />
            </Layout>
          }
        />

        <Route
          exact
          path="/learn"
          element={
            <Layout>
              <Learn />
            </Layout>
          }
        />

        <Route
          exact
          path="/detect"
          element={
            <Layout>
              <Detect />
            </Layout>
          }
        />

        <Route
          exact
          path="/translate"
          element={
            <Layout>
              <Translate />
            </Layout>
          }
        />

        <Route
          exact
          path="/dashboard"
          element={
            <Layout>
              <Dashboard/>
            </Layout>
          }
        />

        <Route exact path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default App;
