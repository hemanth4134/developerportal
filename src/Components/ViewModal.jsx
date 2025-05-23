import { useState, useEffect } from "react";
import { Row, Col, Modal, Card, Container, Form, Stack, Tooltip, OverlayTrigger } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";
import NDTInputModal from "./NDTInputModal";
import WelderInputModal from "./WelderInputModal";
import { getIterationCountforRequest } from "../services/logbook-services";

function ViewModal(props) {
  const [showRecord, setshowRecord] = useState(false);
  const [showNDTDetails, setshowNDTDetails] = useState(false);
  const [wlditr, setwldItr] = useState("");
  const [ndtitr, setndtItr] = useState("");
  const [wldId, setwldId] = useState("");
  const [ndtId, setndtId] = useState("");
  const logid = props.logid;

  useEffect(() => {
    async function loadIterations() {
      let result = await getIterationCountforRequest(logid).catch((err) =>
        console.log("Error in fetching Iterations Request")
      );
      setwldItr(result.wldItrCnt);
      setndtItr(result.ndtItrCnt);
    }
    loadIterations(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var wldArr = [];
  var ndtArr = [];

  for (var i = 1; i <= wlditr; i++) {
    wldArr.push(i);
  }

  for (var j = 1; j <= ndtitr; j++) {
    ndtArr.push(j);
  }

  return (
    <Container>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
        centered
        contentClassName="bdr-radius"
        backdrop="static"
      >
       <Modal.Header closeButton></Modal.Header> 
        <Modal.Body>
          <Row>
            <Col>
              <Row>
                <Card className="card-content">
                  <Card.Header className="FormButtons">
                    Welding Input
                  </Card.Header>
                  {wldArr.map((item, index) => {
                    return (
                      <Card.Body key={index} className="cardSpacing">
                        <Stack direction="horizontal" gap={3}>
                          <Form.Control
                            className="centered-text"
                            type="text"
                            value={item}
                            readOnly
                          />
                          <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">View</Tooltip>}>
                            <ChevronRight
                              className="AngledArrow"
                              size={32}
                              onClick={() => {
                                setshowRecord(true);
                                setwldId(item);
                              }}
                            /></OverlayTrigger>
                        </Stack>
                      </Card.Body>
                    );
                  })}
                </Card>
              </Row>
            </Col>
            <Col>
              <Row>
                <Card className="card-content">
                  <Card.Header className="FormButtons">NDT Input</Card.Header>
                  {ndtArr.map((item, index) => {
                    return (
                      <Card.Body key={index} className="cardSpacing">
                        <Stack direction="horizontal" gap={3}>
                          <Form.Control
                            className="centered-text"
                            type="text"
                            value={item}
                            readOnly
                          />
                          <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">View</Tooltip>}>
                            <ChevronRight
                              className="AngledArrow"
                              size={32}
                              onClick={() => {
                                setshowNDTDetails(true);
                                setndtId(item);
                              }}
                            />
                          </OverlayTrigger>
                        </Stack>
                      </Card.Body>
                    );
                  })}
                </Card>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {showRecord && (
        <WelderInputModal
          show={showRecord}
          logid={logid}
          wlditr={wldId}
          onHide={() => setshowRecord(false)}
        />
      )}
      {showNDTDetails && (
        <NDTInputModal
          show={showNDTDetails}
          logid={logid}
          ndtitr={ndtId}
          onHide={() => setshowNDTDetails(false)}
        />
      )}
    </Container>
  );
}

export default ViewModal;
