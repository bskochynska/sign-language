// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login, loginWithEmailAndPassword, signUpWithEmailAndPassword } from '../../redux/actions/authaction';
// import { FaGoogle } from 'react-icons/fa';
// import './LoginForm.css';

// const LoginForm = ({ notifyMsg, isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [method, setMethod] = useState(null);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   if (!isOpen) return null;

//   const handleGoogleAuth = async () => {
//     try {
//       await dispatch(login());
//       notifyMsg('success', isSignUp ? 'Registration successful!' : 'Login successful!');
//       onClose();
//     } catch (error) {
//       if (error.message.includes('auth/account-exists-with-different-credential')) {
//         notifyMsg('error', 'Account exists with a different sign-in method.');
//       } else {
//         notifyMsg('error', error.message);
//       }
//     }
//   };

//   const handleEmailAuth = async () => {
//     try {
//       if (isSignUp) {
//         await dispatch(signUpWithEmailAndPassword(email, password));
//         notifyMsg('success', 'Registration successful!');
//       } else {
//         await dispatch(loginWithEmailAndPassword(email, password));
//         notifyMsg('success', 'Login successful!');
//       }
//       onClose();
//     } catch (error) {
//       if (error.message.includes('auth/user-not-found')) {
//         notifyMsg('error', 'User not found. Try signing up.');
//       } else if (error.message.includes('auth/email-already-in-use')) {
//         notifyMsg('error', 'Email is already registered. Try signing in.');
//       } else {
//         notifyMsg('error', error.message);
//       }
//     }
//   };

//   const resetForm = () => {
//     setEmail('');
//     setPassword('');
//     setMethod(null);
//   };

//   return (
//     <div className="login-modal-overlay" onClick={onClose}>
//       <div className="login-modal" onClick={(e) => e.stopPropagation()}>
//         <button className="login-modal-close" onClick={onClose}>×</button>
//         <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

//         {!method ? (
//           <>
//             <button className="login-btn" onClick={() => setMethod('email')}>
//               {isSignUp ? 'Sign Up with Email' : 'Sign In with Email'}
//             </button>
//             <button className="google-btn" onClick={handleGoogleAuth}>
//               <FaGoogle /> {isSignUp ? 'Sign Up with Google' : 'Sign In with Google'}
//             </button>
//           </>
//         ) : (
//           <>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button className="login-btn" onClick={handleEmailAuth}>
//               {isSignUp ? 'Register' : 'Login'}
//             </button>
//             <button className="back-btn" onClick={resetForm}>Back</button>
//           </>
//         )}

//         <hr />
//         <p>
//           {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
//           <button className="link" onClick={() => { setIsSignUp(!isSignUp); setMethod(null); }}>
//             {isSignUp ? 'Sign In' : 'Sign Up'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;