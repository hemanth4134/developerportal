import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addNewTechnique, deleteTechnique, updateTechnique } from '../services/material-services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TechniqueMasterModal(props) {
  let techModal = props.techModal;
  const action = props.actions;
  const [Technique, setTechnique] = useState(props.row ? props.row.Technique : "");
  const [TechniqueId] = useState(props.row ? props.row.TechniqueId : "");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if (action !== "Delete") {
      if(techModal && techModal.length>0){
      let result = techModal.find(
        (item) => item['Technique'] === Technique
      );
      if (result) {
        setErrorMessage("Technique Name already exist");
        return false;
      }
    }
    }

    const TechniqueData = {
      Technique
    };

    if (action === "Delete") {
      deleteTechnique(TechniqueId)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        }).catch((error) => {
          console.log("Error in deleting Technique in Master", error);
          toast.error(error.response.data.message)
        });
    }
    else if (action === "Update") {
      updateTechnique(TechniqueData, TechniqueId)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        })
        .catch((error) => {
          console.log("Error in updating Technique in Master", error);
          toast.error(error.response.data.message)
        });
    }
    else {
      addNewTechnique(TechniqueData)
        .then((resp) => {
          if (resp.status === 201) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        })
        .catch((error) => {
          console.log("Error in adding new Technique in Master", error);
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
          {action} Technique
        </Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3 required" controlId="formBasicEmail">
            <Form.Label>Technique Name</Form.Label>
            <Form.Control
              required
              type="text"
              maxlength="255"
              placeholder="Enter Technique Name"
              value={Technique}
              onChange={(e) => setTechnique(e.target.value)}
            />
            <div className="text-danger">{errorMessage}</div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            {action === "Delete"
              ? "Delete"
              : action === "Update" ? "Update" : "Submit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TechniqueMasterModal;
