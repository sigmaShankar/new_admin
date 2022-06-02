import React from "react";
import axios from "axios"

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(diffrent, dispatch, login, password, history, IP, nameValue, setIsLoading, setError) {

  //   setError(false);
  setIsLoading(true);
  let URL = (diffrent == 'loginAccount') ? 'http://13.127.201.98:8000/user/login' : 'http://13.127.201.98:8000/user/signup'

  let temp = {}
  temp['email'] = login
  temp['password'] = password
  temp['full_name'] = nameValue


  axios.post(`${URL}`,
    temp)
    .then((res) => {
      console.log(res, "asknaskn")
      if (res?.hasOwnProperty('error')) {
        localStorage.removeItem("id_token");
        localStorage.clear()
        // dispatch({ type: "SIGN_OUT_SUCCESS" });
        setError(true);
        setIsLoading(false);
      } else {
        sessionStorage.setItem("token", res?.data?.access_token)
        setTimeout(() => {
          localStorage.clear()
          localStorage.setItem('id_token', 1)
          localStorage.setItem("type", "admin")
          setError(null)
          setIsLoading(false)
          //console.log(dispatch({ type: 'LOGIN_SUCCESS' }),'dispatch({ type:  })')
          dispatch({ type: 'LOGIN_SUCCESS' })
          history.push('/app/UploadData')
        }, 2000);
      }
    }).catch((err) => {
      console.log(err)
      localStorage.removeItem("id_token");
      localStorage.clear()
      // dispatch({ type: "SIGN_OUT_SUCCESS" });
      setError(true);
      setIsLoading(false);
    })

  // temp
  console.log(login, password)
  // if (login === 'admin@sigmared.ai' && password === '1234') {

  //   localStorage.clear()
  //   localStorage.setItem('id_token', 1)
  //   localStorage.setItem("type", "admin")
  //   setError(null)
  //   setIsLoading(false)
  //   dispatch({ type: 'LOGIN_SUCCESS' })
  //   history.push('/app/UploadData')
  //   // window.location.reload();

  // } else if (login === 'shankar@sigmared.ai' && password === '1234') {
  //   localStorage.clear()
  //   localStorage.setItem('id_token', 1)
  //   localStorage.setItem("type", "datascience")
  //   setError(null)
  //   setIsLoading(false)
  //   dispatch({ type: 'LOGIN_SUCCESS' })
  //   history.push('/app/UploadData')
  //   // window.location.reload();

  // } else if (login === 'product@sigmared.ai' && password === '1234') {
  //   localStorage.clear()
  //   localStorage.setItem('id_token', 1)
  //   localStorage.setItem("type", "product")
  //   setError(null)
  //   setIsLoading(false)
  //   dispatch({ type: 'LOGIN_SUCCESS' })
  //   history.push('/app/UploadData')
  //   window.location.reload();

  // } else if (login === 'complaince@sigmared.ai' && password === '1234') {
  //   localStorage.clear()
  //   localStorage.setItem('id_token', 1)
  //   localStorage.setItem("type", "complaince")
  //   setError(null)
  //   setIsLoading(false)
  //   dispatch({ type: 'LOGIN_SUCCESS' })
  //   history.push('/app/UploadData')
  //   // window.location.reload();

  // } else {
  //   localStorage.removeItem("id_token");
  //   localStorage.clear()
  //   // dispatch({ type: "SIGN_OUT_SUCCESS" });
  //   setError(true);
  //   setIsLoading(false);
  // }
}

function signOut(dispatch, history) {
  // localStorage.removeItem("id_token");
  localStorage.clear();
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/sign-in");
}
