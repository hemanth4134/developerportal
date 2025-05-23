import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./Components/Home";
import Login from "./Components/Login";
import ErrorPage from "./Components/ErrorPage";
import { useState, useEffect } from "react";
import { authenticate } from './services/user-services';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

function App() {

  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const [validUser, setValidUser] = useState();
  const [idToken, setIdToken] = useState(null);
  const [sessionExp,setSessionExp] = useState(false);
  

  useEffect(() => {
    if (isAuthenticated) {
      RequestProfileData();
    }
    if (idToken && idToken!="") {
      getUserData();
    }
  }, [isAuthenticated,idToken]);

  function RequestProfileData() {
    const request = {
      ...loginRequest,
      account: accounts[0]
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance.acquireTokenSilent(request).then((response) => {
      setIdToken(response.idToken);
    }).catch((e) => {
      instance.acquireTokenPopup(request).then((response) => {
        setIdToken(response.idToken);
      });
    });
  }


  async function getUserData() {
    let email = accounts[0].username;
    let result = await authenticate(email,idToken).catch(err =>
      console.log("Error in fetching details",err));
    if (result && result.UserData && result.UserData != "") {
      sessionStorage.setItem('UserName', result.UserData.userName);
      sessionStorage.setItem('Role', result.UserData.accessRole);
      sessionStorage.setItem('Token', result.Token);
      sessionStorage.setItem('Team', result.UserData.team);
      setValidUser(true);
    }else if(result && result.message=="TokenExpiredError") {
      setValidUser(true);
      setSessionExp(true); 
    }else{
      setValidUser(false);
    }
  }


  return (<>
    <AuthenticatedTemplate>
      {validUser == true && sessionExp == false && <Home />}
      {(validUser == false  || sessionExp == true ) && <ErrorPage validUser={validUser}  sessionExp={sessionExp}/>}
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
      <Login />
    </UnauthenticatedTemplate>
  </>
  );

}
export default App;
