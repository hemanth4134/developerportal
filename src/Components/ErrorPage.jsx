import { Container, Row, Col } from "react-bootstrap";

export default function ErrorPage({ validUser, sessionExp }) {

  return (
    <Container className="error-box">
      <Row>
        <Col>
          {validUser == false &&

            <div className="error-content"> <h4>Oh! User does not exist / inactive in application</h4>
              <p>
                Kindly Contact Admin.
              </p></div>
          }
          {sessionExp == true &&
            <div className="error-content"> <h4>Session Timeout!!!</h4><p>
              Kindly login.
            </p></div>
          } </Col></Row></Container>
  );

}


