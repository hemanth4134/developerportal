import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addNewStage, deleteStage, updateStage } from '../services/material-services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StageMasterModal(props) {
  let stageModal = props.stageModal;
  const action = props.actions;
  const [Stages, setStages] = useState(props.row ? props.row.Stages : "");
  const [StageId] = useState(props.row ? props.row.StageId : "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action !== "Delete") {
      let result = stageModal.find(
        (item) => item['Stages'] === Stages
      );
      if (result) {
        setErrorMessage("Stage Name already exist");
        return false;
      }
    }



    const StageData = {
      Stages
    };

    if (action === "Delete") {
      deleteStage(StageId)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        }).catch((error) => {
          console.log("Error in deleting Stage in Master", error);
          toast.error(error.response.data.message)
        });
    }
    else if (action === "Update") {
      updateStage(StageData, StageId)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        })
        .catch((error) => {
          console.log("Error in updating Stage in Master", error);
          toast.error(error.response.data.message)
        });
    }
    else {
      addNewStage(StageData)
        .then((resp) => {
          if (resp.status === 201) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        })
        .catch((error) => {
          console.log("Error in adding new Stage in Master", error);
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
          {action} Stage
        </Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3 required" controlId="formBasicEmail">
            <Form.Label>Stage Name</Form.Label>
            <Form.Control
              required
              type="text"
              maxlength="255"
              placeholder="Enter Stage Name"
              value={Stages}
              onChange={(e) => setStages(e.target.value)}
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

export default StageMasterModal;
