import { Container, Button, Row, Col, Image ,Stack} from "react-bootstrap";
import React from "react";
import home from "../images/home.png"
import product from "../images/Godrej-aerospace.png";
import { Google,Facebook } from 'react-bootstrap-icons';
import logo from "../images/Godrej_logo.png"

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

export default function Login({validUser}) {

    const { instance} = useMsal();

    function handleLogin(instance) {
        instance.loginRedirect(loginRequest).catch(e => {
            console.error(e);
        }); 
    }
    console.log("version:",process.env.REACT_APP_VERSION);
    
    return (<Container className="login-container">
        
        <Row className="d-flex">
        <Col className="justify-content-center">
            <Container className="Login">
            <Row>
                    <Col>
            <Image className="loginLogo" src={product} />          
            </Col>
            </Row>
            {/* <Row>
                    <Col>
                        <div className="justify-content-center d-flex">Godrej Employee</div>
                    </Col>
                </Row> */}
                <br></br>
                <Row >
                    <Col>
                        <Button variant="success" onClick={() => handleLogin(instance)}><Stack className="justify-content-center" direction="horizontal" gap={2}><Image className="SignInBtn" src={logo} /> Sign in with Godrej</Stack></Button>
                    </Col>
                </Row>
                {/* <hr></hr>
                <Row>
                    <Col>
                    <div className="justify-content-center d-flex">External Users</div>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <Button variant="danger" type="submit"> <Stack direction="horizontal" gap={2}><Google size="20"/> Sign in with Google</Stack></Button>
                    </Col>
                </Row>
                <div className="justify-content-center d-flex">OR</div>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit"> <Stack direction="horizontal" gap={2}><Facebook size="20"/> Sign in with Facebook</Stack></Button>
                    </Col>
                </Row> */}
                <hr></hr>
                <Row>
                    <Col>
                    <div className="justify-content-center d-flex">Copyright @ 2022 | Godrej Infotech</div>
                    </Col>
                </Row>
                
            
            </Container>
        </Col>
        </Row>
        <img className="login-background" src={home} alt="Home" />
    </Container>
    )
}