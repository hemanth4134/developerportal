import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addNewJobDescription  } from '../services/jobdesc-services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchSelect from "../Utility/search-select";
import Switch from "../Utility/Switch";

function JobdescriptionMasterModal(props) {
  let jobdescModal = props.jobdescModal;
  const action = props.actions;
  
  const [projectName, setProjectName] = useState(props.row ? props.row.ProjectName : "");
  const [jobDescription, setJobDescription] = useState(props.row ? props.row.JobDescription : "");
  const [active, setActive] = useState(props.row ? props.row.Active : "Y");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(jobDescription === "" || typeof jobDescription === "undefined" ){
      toast.error("Please select atleast one option")
      return
    }
console.log("jobdescModal",jobdescModal)
     if (action !== "Update"){
     let result = jobdescModal.find(
        (item) => item['ProjectName'] === projectName && item['JobDescription'] === jobDescription
      );
      if (result) {
        setErrorMessage("JobDescription and Project Name already exist");
        return false;
      }
    }
    
    let JobDescriptionData = {
      JobDescription:jobDescription,
      ProjectName:projectName,
      Active:active
    };
  
     addNewJobDescription(JobDescriptionData)
        .then((resp) => {
          if (resp.status === 201) {
            console.log(resp.data.message);
            if(action == "Update" )
             {toast.success("Job Description updated successfully")}
             else{
             toast.success(resp.data.message);
             }
            props.onHide();
            props.callActionTaken()
          } 
        })
        .catch((error) => {
          console.log("addNewJobDescription error:" + error);
          toast.error(error.response.data.message)
        }); 
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
          {action} JobDescription
        </Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}>
        <Modal.Body>
         
           <Form.Group className="mb-2 required" controlId="logbook_Projectname">
             <Form.Label>Project Name</Form.Label>
             { action == "Update" && 
                <Form.Control
              readOnly={true}
              type="text"
              value={projectName}
            />}
             { action != "Update" &&
                <Form.Select required size="sm" aria-label="Projectname" 
                name="projectName" 
                value={projectName} 
                onChange={(e) => {
                setProjectName(e.target.value);
              }}
                >
                <option value="">
                  Select Project
                  </option>
                {props.projectNameList.map((item, index) => {
                return <option key={index} value={item.ProjectName}>{item.ProjectName}</option>
                })}
                </Form.Select>}

           </Form.Group>
           <Form.Group className="mb-2 required" controlId="logbook_Projectname">
             <Form.Label>Job Description</Form.Label>
               { action == "Update" && 
                <Form.Control
              readOnly={true}
              type="text"
              value={jobDescription}
            />}
                { action != "Update" &&
                <><SearchSelect 
                data={props.jobdescription} 
                valueField={"JobDescription"}
                labelField={"JobDescription"} 
                placeholder={"Job Description"} 
                onChange={(value) => { setJobDescription(value)}}
                >
                </SearchSelect>
                   {jobDescription?.length<=0 && <input className="hidden-field-required"
                    tabIndex={-1}
                    autoComplete="off"
                    required={true}/>}
                    </>
                  }  
           </Form.Group>
              <Form.Group  controlId="Active">
                <Form.Label>Active/Inactive</Form.Label>             
                <Switch 
                isOn={active == 'Y'?true : false}
                 handleToggle={() => {setActive(active == 'Y'?'N':'Y')}}               
                 >
                   </Switch> 
              </Form.Group>
          <div className="text-danger">{errorMessage}</div>
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

export default JobdescriptionMasterModal;
