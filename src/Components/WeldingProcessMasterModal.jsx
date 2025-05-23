import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AddNewWeldingProcess, DeleteWeldingProcess, UpdateWeldingProcess } from '../services/material-services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WeldingProcessMasterModal(props) {
  let weldModal = props.weldModal;
  const action = props.actions;
  const [WeldingProcess, setWeldingProcess] = useState(props.row ? props.row.WeldingProcess : "");
  const [WeldingProcessId] = useState(props.row ? props.row.WeldingProcessId : "");
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action !== "Delete") {
      let result = weldModal.find(
        (item) => item['WeldingProcess'] === WeldingProcess
      );
      if (result) {
        setErrorMessage("WeldingProcess Name already exist");
        return false;
      }
    }

    const WeldingProcessData = {
      WeldingProcess
    };

    if (action === "Delete") {
      DeleteWeldingProcess(WeldingProcessId)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        }).catch((error) => {console.log("Error in deleting WeldingProcess in Master", error);
      toast.error(error.response.data.message)
        });
    }
    else if (action === "Update") {
      UpdateWeldingProcess(WeldingProcessData, WeldingProcessId)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        }).catch((error) =>{ console.log("Error in updating WeldingProcess in Master", error);
        toast.error(error.response.data.message)
      });
    }
    else {
      AddNewWeldingProcess(WeldingProcessData)
        .then((resp) => {
          if (resp.status === 201) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        }).catch((error) => {console.log("Error in adding new WeldingProcess in Master", error);
        toast.error(error.response.data.message)
      });
    }
  };


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {action} WeldingProcess
        </Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3 required" controlId="formBasicEmail">
            <Form.Label>WeldingProcess Name</Form.Label>
            <Form.Control
              required
              type="text"
              maxlength="255"
              placeholder="Enter WeldingProcess Name"
              value={WeldingProcess}
              onChange={(e) => setWeldingProcess(e.target.value)
              }
            />
            <div className="text-danger">{errorMessage}</div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            {action === "Delete" ? "Delete" : action === "Update" ? "Update" : "Submit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default WeldingProcessMasterModal;
