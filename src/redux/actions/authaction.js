// import firebase from "firebase/compat/app";
// import { auth } from "../../firebase";
// import Cookies from 'js-cookie';

// import {
//   LOAD_PROF,
//   LOGIN_FAIL,
//   LOGIN_REQ,
//   LOGIN_SUCCESS,
//   LOGOUT,
// } from "../action-types";

// export const login = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: LOGIN_REQ,
//     });

//     const provider = new firebase.auth.GoogleAuthProvider();
    
//     const res = await auth.signInWithPopup(provider);

//     const accessToken = res.credential.accessToken;

//     const profile = {
//       name: res.additionalUserInfo.profile.name,
//       photoURL: res.additionalUserInfo.profile.picture,
//       userId: res.additionalUserInfo.profile.id,
//     };
    

//     Cookies.set('sign-language-ai-access-token', accessToken, { expires: 2 });
//     Cookies.set('sign-language-ai-user', JSON.stringify(profile) , { expires: 2 })

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: accessToken,
//     });

//     dispatch({
//       type: LOAD_PROF,
//       payload: profile,
//     });
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAIL,
//       payload: error.message,
//     });
//   }
// };


// export const logout = () => async dispatch =>{

//     await auth.signOut()

//     dispatch({
//         type: LOGOUT
//     }) 

//     Cookies.remove('sign-language-ai-access-token');
//     Cookies.remove('sign-language-ai-user');
// }



import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../../firebase";
import Cookies from 'js-cookie';

import {
  LOAD_PROF,
  LOGIN_FAIL,
  LOGIN_REQ,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../action-types";

// Login Action — Google або Email/Password
export const login = (method = 'google', email = '', password = '') => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQ });

    let res;

    if (method === 'google') {
      const provider = new firebase.auth.GoogleAuthProvider();
      res = await auth.signInWithPopup(provider);
    } else if (method === 'email') {
      res = await auth.signInWithEmailAndPassword(email, password);
    }

    const user = res.user;
    const accessToken = await user.getIdToken();

    const profile = {
      name: user.displayName || user.email,
      photoURL: user.photoURL || '',
      userId: user.uid,
    };

    Cookies.set('sign-language-ai-access-token', accessToken, { expires: 2 });
    Cookies.set('sign-language-ai-user', JSON.stringify(profile), { expires: 2 });

    dispatch({ type: LOGIN_SUCCESS, payload: accessToken });
    dispatch({ type: LOAD_PROF, payload: profile });

  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};

// Register Action (тільки для email/пароль)
export const register = (email, password, displayName = '') => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQ });

    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;

    // Оновлюємо ім’я користувача
    if (displayName) {
      await user.updateProfile({ displayName });
    }

    const accessToken = await user.getIdToken();

    const profile = {
      name: displayName || email,
      photoURL: '',
      userId: user.uid,
    };

    Cookies.set('sign-language-ai-access-token', accessToken, { expires: 2 });
    Cookies.set('sign-language-ai-user', JSON.stringify(profile), { expires: 2 });

    dispatch({ type: LOGIN_SUCCESS, payload: accessToken });
    dispatch({ type: LOAD_PROF, payload: profile });

  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};

// Logout
export const logout = () => async dispatch => {
  await auth.signOut();

  Cookies.remove('sign-language-ai-access-token');
  Cookies.remove('sign-language-ai-user');

  dispatch({ type: LOGOUT });
};
