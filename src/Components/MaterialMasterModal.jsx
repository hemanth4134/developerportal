import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addNewMaterial, deleteMaterial, updateMaterial } from '../services/material-services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MaterialMasterModal(props) {
  let masterModal = props.masterModal;
  const action = props.actions;
  const [ProjectName, setProjectName] = useState(props.row ? props.row.ProjectName : "");
  const [MaterialName, setMaterialName] = useState(props.row ? props.row.MaterialName : "");
  const [MaterialId] = useState(props.row ? props.row.MaterialId : "");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action !== "Delete") {
      let result = masterModal.find(
        (item) => item['ProjectName'] === ProjectName && item['MaterialName'] === MaterialName
      );
      if (result) {
        setErrorMessage("Material and Project Name already exist");
        return false;
      }
    }

    const Material = {
      MaterialId,
      ProjectName,
      MaterialName
    };

    if (action === "Delete") {
      deleteMaterial(MaterialId)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        })
        .catch((error) => {
          console.log("Error in deleting Material in Master", error);
          toast.error(error.response.data.message)
        });
    }
    else if (action === "Update") {
      updateMaterial(Material, MaterialId)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        })
        .catch((error) => {
          console.log("updateMaterial error:" + error);
          toast.error(error.response.data.message)
        });
    }
    else {
      addNewMaterial(Material)
        .then((resp) => {
          if (resp.status === 201) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        })
        .catch((error) => {
          console.log("addNewMaterial error:" + error);
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
          {action} Material
        </Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3 required" controlId="ProjectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              required
              title="Project Name"
              type="text"
              maxlength="255"
              placeholder="Enter Project Name"
              value={ProjectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 required" controlId="MaterialName">
            <Form.Label>Material Name</Form.Label>
            <Form.Control
              required
              title="Material Name"
              type="text"
              placeholder="Enter Material Name"
              value={MaterialName}
              onChange={(e) => { setMaterialName(e.target.value); }}
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
    </Modal >
  );
}

export default MaterialMasterModal;
