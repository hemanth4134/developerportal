import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addNewProject, deleteProject, updateProject } from '../services/material-services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProjectMasterModal(props) {
  let projModal = props.projModal;
  const action = props.actions;
  const [ProjectName, setProjectName] = useState(props.row ? props.row.ProjectName : "");
  const [ProjectId] = useState(props.row ? props.row.ProjectId : "");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action !== "Delete") {
      let result = projModal.find(
        (item) => item['ProjectName'] === ProjectName
      );
      if (result) {
        setErrorMessage("Project Name already exist");
        return false;
      }
    }

    const ProjectData = {
      ProjectName
    };

    if (action === "Delete") {
      deleteProject(ProjectId)
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
      updateProject(ProjectData, ProjectId)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        }).catch((error) => {
          console.log("Error in updating Stage in Master", error);
          toast.error(error.response.data.message)
        });
    }
    else {
      addNewProject(ProjectData)
        .then((resp) => {
          if (resp.status === 201) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        }).catch((error) => {
          console.log("Error in adding new Project in Master", error);
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
          {action} Project
        </Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3 required" controlId="formBasicEmail">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              required
              type="text"
              maxlength="255"
              placeholder="Enter Project Name"
              value={ProjectName}
              onChange={(e) => setProjectName(e.target.value)}
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

export default ProjectMasterModal;
