import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assests/logo.svg";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/actions/authaction";
import { FaSignInAlt } from 'react-icons/fa';
import "../styles/reset.css";
import "../styles/style.css";
import { FiArrowUpRight } from 'react-icons/fi';
import GestureAlphabetModal from '../GestureAlphabetModal/GestureAlphabetModal';


const Navbar = ({ notifyMsg }) => {
  const [toggle, setToggle] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const user = useSelector((state) => state.auth?.user);

  const { accessToken } = useSelector((state) => state.auth);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && user) {
      notifyMsg(
        "success",
        `Вітаємо! ${user?.name}, Ви успішно увійшли`
      );
    }
  }, [isLoggedIn, user, notifyMsg]);

  const handleLogin = () => {
    dispatch(login());
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    notifyMsg("success", "Ви успішно вийшли!");
  };

  return (
    <div className="signlang_navbar  gradient__bg">
        <div className="signlang_navlinks_logo">
          <a href="/">
            <img className="logo" src={logo} alt="logo" />
          </a>
        </div>
      <div className="singlang_navlinks">
        <div className="signlang_navlinks_container">
          <p>
            <Link to="/">головна</Link>
          </p>

          <p>
            <Link to="/detect">розпізнавання</Link>
          </p>

          <p>
            <Link to="/learn">вивчення</Link>
          </p>

          <p>
            <Link to="/translate">переклад</Link>
          </p>

          {accessToken && (
            <p>
              <Link to="/dashboard">аналітика</Link>
            </p>
          )}
        </div>

        <div className="signlang_auth-data">
          {accessToken ? (
            <>
              <img src={user?.photoURL} alt="user-icon" />
              <button type="button" onClick={handleLogout}>
                Вийти
              </button>
            </>
          ) : (
            <button type="button" onClick={handleLogin}>
            <FaSignInAlt style={{ marginRight: '8px', color: '#0E19D7' }} />
            Увійти
          </button>
          )}
        </div>

        <a href="#" className="gesture_alphabet-link" onClick={() => setModalOpen(true)}>
        <span>алфавіт мови жестів</span>
        <FiArrowUpRight className="arrow-icon" />
      </a>

        <GestureAlphabetModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>

      <div className="signlang__navbar-menu">
  
      <div className={`menu-icon ${toggle ? "active" : ""}`} onClick={() => setToggle(!toggle)}>
    {toggle ? (
      <RiCloseLine color="#ffffff" /> // Білий колір, коли меню активне
    ) : (
      <RiMenu3Line color="#5259E2" /> // Початковий колір
    )}
  </div>

  {toggle && (
    <div className="signlang__navbar-menu_container scale-up-center">
      {/* твоє меню */}
    </div>
  )}

  {toggle && (
    <div className="signlang__navbar-menu_container fullscreen-menu">
      <div className="signlang__navbar-menu_container-links">
        <p><Link to="/">Головна</Link></p>
        <p><Link to="/detect">Розпізнавання</Link></p>
        <p><Link to="/learn">Вивчення</Link></p>
        <p><Link to="/translate">Переклад</Link></p>
        {accessToken && <p><Link to="/dashboard">Аналітика</Link></p>}
      </div>

      <div className="signlang__navbar-menu_container-links-authdata">
        {accessToken ? (
          <>
          <div className="user-icon-wrapper">
            <img src={user?.photoURL} alt="user-icon" />
            <button type="button" onClick={handleLogout}>Вийти</button>
         </div>
          </>
        ) : (
          <button type="button" onClick={handleLogin}>Увійти</button>
        )}

        <a href="#" className="gesture_alphabet-link" onClick={() => setModalOpen(true)}>
                <span>алфавіт мови жестів</span>
                <FiArrowUpRight className="arrow-icon" />
            </a>

      </div>
    </div>
  )}
</div>

    </div>
  );
};

export default Navbar;

// import React, { useEffect, useState } from "react";
// import "./Navbar.css";
// import { Link } from "react-router-dom";
// import logo from "../../assests/logo.svg";
// import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { login, logout } from "../../redux/actions/authaction";
// import { FaSignInAlt } from 'react-icons/fa';
// import "../styles/reset.css";
// import "../styles/style.css";
// import { FiArrowUpRight } from 'react-icons/fi';
// import GestureAlphabetModal from '../GestureAlphabetModal/GestureAlphabetModal';

// const Navbar = ({ notifyMsg }) => {
//   const [toggle, setToggle] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const user = useSelector((state) => state.auth?.user);
//   const { accessToken } = useSelector((state) => state.auth);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (isLoggedIn && user) {
//       notifyMsg("success", `Welcome! ${user?.name}, You Logged in Successfully`);
//     }
//   }, [isLoggedIn, user, notifyMsg]);

//   const handleLogin = () => {
//     dispatch(login());
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     notifyMsg("success", "Logged Out Successfully !");
//   };

//   const handleSignUp = () => {
//     window.location.href = "/signup";
//   };

//   return (
//     <div className="signlang_navbar gradient__bg">
//       <div className="signlang_navlinks_logo">
//         <a href="/">
//           <img className="logo" src={logo} alt="logo" />
//         </a>
//       </div>

//       <div className="singlang_navlinks">
//         <div className="signlang_navlinks_container">
//           <p><Link to="/">головна</Link></p>
//           <p><Link to="/detect">розпізнавання</Link></p>
//           <p><Link to="/learn">вивчення</Link></p>
//           <p><Link to="/translate">переклад</Link></p>
//           {accessToken && (
//             <p><Link to="/dashboard">Dashboard</Link></p>
//           )}
//         </div>

//         <div className="signlang_auth-data">
//           {accessToken ? (
//             <>
//               <img src={user?.photoURL} alt="user-icon" />
//               <button type="button" onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <div className="auth-buttons">
//               <button type="button" onClick={handleLogin}>
//                 <FaSignInAlt style={{ marginRight: '8px', color: '#0E19D7' }} />
//                 Увійти
//               </button>
//               <button type="button" onClick={handleSignUp} className="signup-btn">
//                 Sign Up
//               </button>
//             </div>
//           )}
//         </div>

//         <a href="#" className="gesture_alphabet-link" onClick={() => setModalOpen(true)}>
//           <span>алфавіт мови жестів</span>
//           <FiArrowUpRight className="arrow-icon" />
//         </a>

//         <GestureAlphabetModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
//       </div>

//       <div className="signlang__navbar-menu">
//         <div className={`menu-icon ${toggle ? "active" : ""}`} onClick={() => setToggle(!toggle)}>
//           {toggle ? (
//             <RiCloseLine color="#ffffff" />
//           ) : (
//             <RiMenu3Line color="#5259E2" />
//           )}
//         </div>

//         {toggle && (
//           <div className="signlang__navbar-menu_container fullscreen-menu scale-up-center">
//             <div className="signlang__navbar-menu_container-links">
//               <p><Link to="/">Головна</Link></p>
//               <p><Link to="/detect">Розпізнавання</Link></p>
//               <p><Link to="/learn">Вивчення</Link></p>
//               <p><Link to="/translate">Переклад</Link></p>
//               {accessToken && <p><Link to="/dashboard">Dashboard</Link></p>}
//             </div>

//             <div className="signlang__navbar-menu_container-links-authdata">
//               {accessToken ? (
//                 <>
//                   <img src={user?.photoURL} alt="user-icon" />
//                   <button type="button" onClick={handleLogout}>Logout</button>
//                 </>
//               ) : (
//                 <div className="auth-buttons">
//                   <button type="button" onClick={handleLogin}>Login</button>
//                   <button type="button" onClick={handleSignUp} className="signup-btn">Sign Up</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;



// import React, { useEffect, useState } from "react";
// import "./Navbar.css";
// import { Link } from "react-router-dom";
// import logo from "../../assests/logo.svg";
// import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/actions/authaction";
// import { FaSignInAlt } from 'react-icons/fa';
// import "../styles/reset.css";
// import "../styles/style.css";
// import { FiArrowUpRight } from 'react-icons/fi';
// import GestureAlphabetModal from '../GestureAlphabetModal/GestureAlphabetModal';
// import LoginForm from '../../redux/actions/LoginForm'; // ⬅️ імпорт модалки LoginForm

// const Navbar = ({ notifyMsg }) => {
//   const [toggle, setToggle] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loginModalOpen, setLoginModalOpen] = useState(false); // ⬅️ стан для LoginForm
//   const user = useSelector((state) => state.auth?.user);
//   const { accessToken } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (accessToken && user) {
//       notifyMsg("success", `Welcome! ${user?.name}, You Logged in Successfully`);
//     }
//   }, [accessToken, user, notifyMsg]);

//   const handleLogout = () => {
//     dispatch(logout());
//     notifyMsg("success", "Logged Out Successfully !");
//   };

//   const openLoginModal = () => setLoginModalOpen(true); // ⬅️ відкриття модалки
//   const closeLoginModal = () => setLoginModalOpen(false); // ⬅️ закриття модалки

//   return (
//     <div className="signlang_navbar gradient__bg">
//       <div className="signlang_navlinks_logo">
//         <a href="/">
//           <img className="logo" src={logo} alt="logo" />
//         </a>
//       </div>

//       <div className="singlang_navlinks">
//         <div className="signlang_navlinks_container">
//           <p><Link to="/">головна</Link></p>
//           <p><Link to="/detect">розпізнавання</Link></p>
//           <p><Link to="/learn">вивчення</Link></p>
//           <p><Link to="/translate">переклад</Link></p>
//           {accessToken && (
//             <p><Link to="/dashboard">Dashboard</Link></p>
//           )}
//         </div>

//         <div className="signlang_auth-data">
//           {accessToken ? (
//             <>
//               <img src={user?.photoURL} alt="user-icon" />
//               <button type="button" onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <div className="auth-buttons">
//               <button type="button" onClick={openLoginModal}>
//                 <FaSignInAlt style={{ marginRight: '8px', color: '#0E19D7' }} />
//                 Увійти
//               </button>
//               <button type="button" onClick={openLoginModal} className="signup-btn">
//                 Sign Up
//               </button>
//             </div>
//           )}
//         </div>

//         <a href="#" className="gesture_alphabet-link" onClick={() => setModalOpen(true)}>
//           <span>алфавіт мови жестів</span>
//           <FiArrowUpRight className="arrow-icon" />
//         </a>

//         <GestureAlphabetModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
//         <LoginForm isOpen={loginModalOpen} onClose={closeLoginModal} /> {/* ⬅️ LoginForm як модалка */}
//       </div>

//       <div className="signlang__navbar-menu">
//         <div className={`menu-icon ${toggle ? "active" : ""}`} onClick={() => setToggle(!toggle)}>
//           {toggle ? (
//             <RiCloseLine color="#ffffff" />
//           ) : (
//             <RiMenu3Line color="#5259E2" />
//           )}
//         </div>

//         {toggle && (
//           <div className="signlang__navbar-menu_container fullscreen-menu scale-up-center">
//             <div className="signlang__navbar-menu_container-links">
//               <p><Link to="/">Головна</Link></p>
//               <p><Link to="/detect">Розпізнавання</Link></p>
//               <p><Link to="/learn">Вивчення</Link></p>
//               <p><Link to="/translate">Переклад</Link></p>
//               {accessToken && <p><Link to="/dashboard">Dashboard</Link></p>}
//             </div>

//             <div className="signlang__navbar-menu_container-links-authdata">
//               {accessToken ? (
//                 <>
//                   <img src={user?.photoURL} alt="user-icon" />
//                   <button type="button" onClick={handleLogout}>Logout</button>
//                 </>
//               ) : (
//                 <div className="auth-buttons">
//                   <button type="button" onClick={openLoginModal}>Login</button>
//                   <button type="button" onClick={openLoginModal} className="signup-btn">Sign Up</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;