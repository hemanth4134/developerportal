import { Container, Form, Modal, Row } from "react-bootstrap";
import React, { useState,useEffect } from "react";
import { getWelderInput, getFile } from "../services/logbook-services";


function WelderInputModal(props) {

    const logId= props.logid;
    const wldItrId = props.wlditr
    const [wldInput, setwldInput] = useState([]);

    useEffect(() => {
        async function loadWldData() {
          let res = await getWelderInput(logId,wldItrId).catch((err) =>
            console.log("Error in fetching Welder Input Data ")
          );
          setwldInput(res);
        }
        loadWldData(); // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

    const downLoad = (logId, file, fileName) => {
        getFile(logId,file,fileName).catch((err) =>
        console.log("Error in fetching File for Welder")
      );
    }

    return (
        <Container>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="example-custom-modal-styling-title-1"
                centered
                className="welder-modal"
                contentClassName="welder-modal-content"
                backdrop="static"

            >
                <Modal.Header closeButton closeVariant="white" className="welder-modal-header">
                    <Modal.Title id="contained-modal-title-vcenter-1" className="welder_ndt-modal-title" >
                        Welder Input Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>                 
                    <div className="spaced-content" >
                        <Form.Label>Plant</Form.Label>
                        <Form.Label>{wldInput.plant}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Label>{wldInput.projectName}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Material Name</Form.Label>
                        <Form.Label>{wldInput.materialName}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Welder Name</Form.Label>
                        <Form.Label>{wldInput.welderName}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Type</Form.Label>
                        <Form.Label class="wrap-text">{wldInput.type}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Drawing No</Form.Label>
                        <Form.Label class="wrap-text">{wldInput.drawingNo}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Seam No</Form.Label>
                        <Form.Label class="wrap-text">{wldInput.seamNo}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Identification</Form.Label>
                        <Form.Label class="wrap-text">{wldInput.identification}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Stage</Form.Label>
                        <Form.Label>{wldInput.stage}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Thickness</Form.Label>
                        <Form.Label>{wldInput.thickness}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>NDE</Form.Label>
                        <Form.Label>{wldInput.NDE}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Welding Process</Form.Label>
                        <Form.Label>{wldInput.weldingProcess}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Job Description</Form.Label>
                        <Form.Label class="wrap-text">{wldInput.jobDescription}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Label class="wrap-text">{wldInput.remarks}</Form.Label>
                    </div>
                    <div className="spaced-content">
                        <Form.Label>Attachments</Form.Label>
                        <Row align="right">
                            {wldInput?.attachmentpath?.length >0 && wldInput?.attachmentpath.map((item,index)=>{
                                let split1 = item.split("/")
                                let split = split1[1].split("_")
                                return(
                                    <>
                                    <Form.Label><a href="#" onClick={() => {downLoad(logId,split1[1],split[1])}} >{split[1]}</a></Form.Label>
                                </>
                                )
                            })}
                     </Row>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default WelderInputModal;