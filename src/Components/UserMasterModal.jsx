import React, { useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { addNewUser, deleteUser, updateUser } from '../services/user-services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Switch from "../Utility/Switch";

function UserMasterModal(props) {
  const action = props.actions;
  let userModal = props.userModal;
  const [userName, setUserName] = useState(props.row ? props.row.userName : "");
  const [emailId, setEmailId] = useState(props.row ? props.row.emailId : "");
  const [phoneNumber, setPhoneNumber] = useState(props.row ? props.row.phoneNumber : "");
  const [team, setTeam] = useState(props.row ? props.row.team : "");
  const [plant, setPlant] = useState(props.row ? props.row.plant : "");
  const [accessRole, setAccessRole] = useState(props.row ? props.row.accessRole : "");
  const [active, setActive] = useState(props.row ? props.row.active : "Y");
  const [errorMessage, setErrorMessage] = React.useState("");

  const teams = [
    { value: 'NDT Team', label: 'NDT Team' },
    { value: 'Welding Team', label: 'Welding Team' }
  ]

  const options = [
    { value: '8', label: '8' },
    { value: '16A', label: '16A' },
    { value: '4B', label: '4B' }
  ]

  const roles = [
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' }
  ]
  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "Add") {
      let result = userModal.find(
        (item) => item['emailId'] === emailId
      );
      if (result) {
        setErrorMessage("Email Id already exist");
        return false;
      }
    }
 
    const UserData = {
      emailId,
      userName,
      phoneNumber,
      team,
      plant,
      accessRole,
      active };
      

    if (action === "Delete") {
      deleteUser(emailId)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        }).catch((error) => {
          console.log("Error in deleting User in Master", error);
          toast.error(error.response.data.message)
        });
    }
    else if (action === "Update") {
      updateUser(UserData, emailId)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        }).catch((error) => {
          console.log("Error in updating User in Master", error);
          toast.error(error.response.data.message)
        });
    }
    else {
      addNewUser(UserData)
        .then((resp) => {
          if (resp.status === 201) {
            console.log(resp.data.message);
            toast.success(resp.data.message);
            props.onHide();
            props.callActionTaken()
          }
        }).catch((error) => {
          console.log("Error in adding new User in Master", error);
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
          {action} User
        </Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-3 required" controlId="UserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  maxlength="255"
                  placeholder="Enter User Name"
                  value={userName}
                  onChange={(e) => { setUserName(e.target.value); }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 required" controlId="EmailId">
                <Form.Label>Email Id</Form.Label>
                {action !== "Add" &&
                  <Form.Control
                    readOnly
                    type="email"
                    maxlength="255"
                    placeholder="Enter Email Id"
                    value={emailId}
                    onChange={(e) => { setEmailId(e.target.value); }}
                  />
                }
                {action === "Add" &&
                  <Form.Control
                    required
                    type="email"
                    maxlength="255"
                    placeholder="Enter Email Id"
                    value={emailId}
                    onChange={(e) => { setEmailId(e.target.value); }}
                  />
                }
                <div className="text-danger">{errorMessage}</div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="PhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type='number'
                  maxLength="10"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.slice(0, 10))}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 required" controlId="Team">
                <Form.Label>Team</Form.Label>
                <Form.Select name="team"
                  required
                  value={team} onChange={(e) => setTeam(e.target.value)} >
                  <option value="">Select Team</option>
                  {teams.map((item, index) => {
                    return <option key={index} value={item.value}>{item.label}</option>
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="Plant">
                <Form.Label>Plant</Form.Label>
                <Form.Select name="plant"
                  value={plant} onChange={(e) => setPlant(e.target.value)} >
                  <option value="">Select Plant</option>
                  {options.map((item, index) => {
                    return <option key={index} value={item.value}>{item.label}</option>
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 required" controlId="Role">
                <Form.Label>Role</Form.Label>
                <Form.Select name="Role"
                  required
                  value={accessRole} onChange={(e) => setAccessRole(e.target.value)} >
                  <option value="">Select Role</option>
                  {roles.map((item, index) => {
                    return <option key={index} value={item.value}>{item.label}</option>
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col>
              <Form.Group  controlId="Active">
                <Form.Label>Active/Inactive</Form.Label>             
                <Switch 
                isOn={active == 'Y'?true : false}
                 handleToggle={() => {setActive(active == 'Y'?'N':'Y')}}               
                 >
                   </Switch> 
              </Form.Group>
            </Col>
            </Row>
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


export default UserMasterModal;
