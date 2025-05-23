import { Container, Form, Modal, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { getNDTInput, getFile } from "../services/logbook-services";

function NDTInputModal(props) {
  const logId = props.logid;
  const ndtItrId = props.ndtitr;
  const [ndtInput, setndtInput] = useState([]);

  useEffect(() => {
    async function loadNDTData() {
      let res = await getNDTInput(logId, ndtItrId).catch((err) =>
        console.log("Error in fetching NDT Input Data ")
      );
      setndtInput(res);
    }
    loadNDTData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

    const downLoad = (logId, file, fileName) => {
        getFile(logId,file,fileName).catch((err) =>
        console.log("Error in fetching File for NDT")
      );
    }

  let Dispositionchecked =
    ndtInput.DispositionText !== "" &&
    typeof ndtInput.DispositionText !== "undefined" &&
    ndtInput.DispositionText != null
      ? true
      : false;
  let Okchecked =
    ndtInput.OkText !== "" &&
    typeof ndtInput.OkText !== "undefined" &&
    ndtInput.OkText != null
      ? true
      : false;
  let PorewithTailchecked =
    ndtInput.PorewithTailText !== "" &&
    typeof ndtInput.PorewithTailText !== "undefined" &&
    ndtInput.PorewithTailText != null
      ? true
      : false;
  let IsolatedPorositychecked =
    ndtInput.IsolatedPorosityText !== "" &&
    typeof ndtInput.IsolatedPorosityText !== "undefined" &&
    ndtInput.IsolatedPorosityText != null
      ? true
      : false;
  let AllignedPorositychecked =
    ndtInput.AllignedPorosityText !== "" &&
    typeof ndtInput.AllignedPorosityText !== "undefined" &&
    ndtInput.AllignedPorosityText != null
      ? true
      : false;
  let ChainPorositychecked =
    ndtInput.ChainPorosityText !== "" &&
    typeof ndtInput.ChainPorosityText !== "undefined" &&
    ndtInput.ChainPorosityText != null
      ? true
      : false;
  let ClusterPorositychecked =
    ndtInput.ClusterPorosityText !== "" &&
    typeof ndtInput.ClusterPorosityText !== "undefined" &&
    ndtInput.ClusterPorosityText != null
      ? true
      : false;
  let LinearIndicationchecked =
    ndtInput.LinearIndicationText !== "" &&
    typeof ndtInput.LinearIndicationText !== "undefined" &&
    ndtInput.LinearIndicationText != null
      ? true
      : false;
  let TungstenInclusionchecked =
    ndtInput.TungstenInclusionText !== "" &&
    typeof ndtInput.TungstenInclusionText !== "undefined" &&
    ndtInput.TungstenInclusionText != null
      ? true
      : false;
  let Mergechecked =
    ndtInput.MergeText !== "" &&
    typeof ndtInput.MergeText !== "undefined" &&
    ndtInput.MergeText != null
      ? true
      : false;
  let Undercutchecked =
    ndtInput.UndercutText !== "" &&
    typeof ndtInput.UndercutText !== "undefined" &&
    ndtInput.UndercutText != null
      ? true
      : false;
  let Underfillchecked =
    ndtInput.UnderfillText !== "" &&
    typeof ndtInput.UnderfillText !== "undefined" &&
    ndtInput.UnderfillText != null
      ? true
      : false;
  let LackofFusionchecked =
    ndtInput.LackofFusionText !== "" &&
    typeof ndtInput.LackofFusionText !== "undefined" &&
    ndtInput.LackofFusionText != null
      ? true
      : false;
  let InterpassFusionchecked =
    ndtInput.InterpassFusionText !== "" &&
    typeof ndtInput.InterpassFusionText !== "undefined" &&
    ndtInput.InterpassFusionText != null
      ? true
      : false;
  let LackofPenetrationchecked =
    ndtInput.LackofPenetrationText !== "" &&
    typeof ndtInput.LackofPenetrationText !== "undefined" &&
    ndtInput.LackofPenetrationText != null
      ? true
      : false;
  let SuckBackchecked =
    ndtInput.SuckBackText !== "" &&
    typeof ndtInput.SuckBackText !== "undefined" &&
    ndtInput.SuckBackText != null
      ? true
      : false;
  let Oxidationchecked =
    ndtInput.OxidationText !== "" &&
    typeof ndtInput.OxidationText !== "undefined" &&
    ndtInput.OxidationText != null
      ? true
      : false;
  let Concavitychecked =
    ndtInput.ConcavityText !== "" &&
    typeof ndtInput.ConcavityText !== "undefined" &&
    ndtInput.ConcavityText != null
      ? true
      : false;
  let Crackchecked =
    ndtInput.CrackText !== "" &&
    typeof ndtInput.CrackText !== "undefined" &&
    ndtInput.CrackText != null
      ? true
      : false;
  let PositiveRecallchecked =
    ndtInput.PositiveRecallText !== "" &&
    typeof ndtInput.PositiveRecallText !== "undefined" &&
    ndtInput.PositiveRecallText != null
      ? true
      : false;
  let ProcessMarkchecked =
    ndtInput.ProcessMarkNumber !== "" &&
    typeof ndtInput.ProcessMarkNumber !== "undefined" &&
    ndtInput.ProcessMarkNumber != null
      ? true
      : false;
  let Lightleakchecked =
    ndtInput.LightleakNumber !== "" &&
    typeof ndtInput.LightleakNumber !== "undefined" &&
    ndtInput.LightleakNumber != null
      ? true
      : false;
  let Watermarkchecked =
    ndtInput.WatermarkNumber !== "" &&
    typeof ndtInput.WatermarkNumber !== "undefined" &&
    ndtInput.WatermarkNumber != null
      ? true
      : false;
  let Scrathmarkchecked =
    ndtInput.ScrathmarkNumber !== "" &&
    typeof ndtInput.ScrathmarkNumber !== "undefined" &&
    ndtInput.ScrathmarkNumber != null
      ? true
      : false;
  let WrongTechniquechecked =
    ndtInput.WrongTechniqueNumber !== "" &&
    typeof ndtInput.WrongTechniqueNumber !== "undefined" &&
    ndtInput.WrongTechniqueNumber != null
      ? true
      : false;
  let Crimpmarkchecked =
    ndtInput.CrimpmarkNumber !== "" &&
    typeof ndtInput.CrimpmarkNumber !== "undefined" &&
    ndtInput.CrimpmarkNumber != null
      ? true
      : false;
  let HighDensitychecked =
    ndtInput.HighDensityNumber !== "" &&
    typeof ndtInput.HighDensityNumber !== "undefined" &&
    ndtInput.HighDensityNumber != null
      ? true
      : false;
  let LowDensitychecked =
    ndtInput.LowDensityNumber !== "" &&
    typeof ndtInput.LowDensityNumber !== "undefined" &&
    ndtInput.LowDensityNumber != null
      ? true
      : false;

  return (
    <Container>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="example-custom-modal-styling-title-1"
        centered
        className="ndt-modal"
        contentClassName="ndt-modal-content"
        backdrop="static"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="ndt-modal-header"
        >
          <Modal.Title
            id="contained-modal-title-vcenter-1"
            className="welder_ndt-modal-title"
          >
            NDT Input Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="spaced-content">
            <Form.Label>No of Spots</Form.Label>
            <Form.Label>Repair spots</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>{ndtInput.spotsvalue}</Form.Label>
            <Form.Label>{ndtInput.repairspots}</Form.Label>
          </div>
          <h5>Desposition</h5>
          <div className="spaced-content">
            <Form.Check 
              type={"checkbox"}
              id={"disposition"}
              label={"Disposition"}
              checked={Dispositionchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.DispositionText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"Ok"}
              label={"Ok"}
              checked={Okchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.OkText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"PorewithTail"}
              label={"PorewithTail"}
              checked={PorewithTailchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.PorewithTailText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"IsolatedPorosity"}
              label={"IsolatedPorosity"}
              checked={IsolatedPorositychecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.IsolatedPorosityText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"AllignedPorosity"}
              label={"AllignedPorosity"}
              checked={AllignedPorositychecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.AllignedPorosityText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"ChainPorosity"}
              label={"ChainPorosity"}
              checked={ChainPorositychecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.ChainPorosityText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"ClusterPorosity"}
              label={"ClusterPorosity"}
              checked={ClusterPorositychecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.ClusterPorosityText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"LinearIndication"}
              label={"LinearIndication"}
              checked={LinearIndicationchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.LinearIndicationText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"TungstenInclusion"}
              label={"TungstenInclusion"}
              checked={TungstenInclusionchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.TungstenInclusionText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"Merge"}
              label={"Merge"}
              checked={Mergechecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.MergeText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"Undercut"}
              label={"Undercut"}
              checked={Undercutchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.UndercutText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"Underfill"}
              label={"Underfill"}
              checked={Underfillchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.UnderfillText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"LackofFusion"}
              label={"LackofFusion"}
              checked={LackofFusionchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.LackofFusionText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"InterpassFusion"}
              label={"InterpassFusion"}
              checked={InterpassFusionchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.InterpassFusionText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"LackofPenetration"}
              label={"LackofPenetration"}
              checked={LackofPenetrationchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.LackofPenetrationText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"SuckBack"}
              label={"SuckBack"}
              checked={SuckBackchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.SuckBackText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"Oxidation"}
              label={"Oxidation"}
              checked={Oxidationchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.OxidationText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"Concavity"}
              label={"Concavity"}
              checked={Concavitychecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.ConcavityText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"Crack"}
              label={"Crack"}
              checked={Crackchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.CrackText}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"PositiveRecall"}
              label={"PositiveRecall"}
              checked={PositiveRecallchecked}
              readOnly
            />
            <Form.Label class="wrap-text">{ndtInput.PositiveRecallText}</Form.Label>
          </div>
          <h5>Process Defect</h5>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"ProcessMark"}
              label={"ProcessMark"}
              checked={ProcessMarkchecked}
              readOnly
            />
            <Form.Label>{ndtInput.ProcessMarkNumber}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"Lightleak"}
              label={"Lightleak"}
              checked={Lightleakchecked}
              readOnly
            />
            <Form.Label>{ndtInput.LightleakNumber}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"Watermark"}
              label={"Watermark"}
              checked={Watermarkchecked}
              readOnly
            />
            <Form.Label>{ndtInput.WatermarkNumber}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"Scrathmark"}
              label={"Scrathmark"}
              checked={Scrathmarkchecked}
              readOnly
            />
            <Form.Label>{ndtInput.ScrathmarkNumber}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"WrongTechnique"}
              label={"WrongTechnique"}
              checked={WrongTechniquechecked}
              readOnly
            />
            <Form.Label>{ndtInput.WrongTechniqueNumber}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"Crimpmark"}
              label={"Crimpmark"}
              checked={Crimpmarkchecked}
              readOnly
            />
            <Form.Label>{ndtInput.CrimpmarkNumber}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"HighDensity"}
              label={"HighDensity"}
              checked={HighDensitychecked}
              readOnly
            />
            <Form.Label>{ndtInput.HighDensityNumber}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Check
              type={"checkbox"}
              id={"LowDensity"}
              label={"LowDensity"}
              checked={LowDensitychecked}
              readOnly
            />
            <Form.Label>{ndtInput.LowDensityNumber}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>Type of Film</Form.Label>
            <Form.Label>No of Films</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>{ndtInput.TypeofFilm}</Form.Label>
            <Form.Label>{ndtInput.NoOfFilms}</Form.Label>
          </div>
          <h5>RT Parameters</h5>
          <div className="spaced-content">
            <Form.Label>Current</Form.Label>
            <Form.Label>Voltage</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>{ndtInput.Current_Curie}</Form.Label>
            <Form.Label>{ndtInput.Voltage_KV}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>Exposure Time</Form.Label>
            <Form.Label>Focal Size</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>{ndtInput.ExposureTime_min}</Form.Label>
            <Form.Label>{ndtInput.FocalSize}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>IQI</Form.Label>
            <Form.Label>SFD</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>{ndtInput.IQI}</Form.Label>
            <Form.Label>{ndtInput.SFD}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>Weld Category</Form.Label>
            <Form.Label></Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>{ndtInput.WeldCategory}</Form.Label>
            <Form.Label>{}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>Film Size</Form.Label>
            <Form.Label>Sensitivity</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>{ndtInput.FilmSize}</Form.Label>
            <Form.Label>{ndtInput.Sensitivity}</Form.Label>
          </div>
          <div className="spaced-content">
          <Form.Label>Name of Technician</Form.Label>
            <Form.Label>Technique</Form.Label>
          </div>
          <div className="spaced-content">
          <Form.Label>{ndtInput.technicianName}</Form.Label>
            <Form.Label>{ndtInput.Technique}</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label>Remarks</Form.Label>
            <Form.Label>Attachments</Form.Label>
          </div>
          <div className="spaced-content">
            <Form.Label class="wrap-text" >{ndtInput.Remarks}</Form.Label>
            <Row align="right">
              {ndtInput.attachmentpath?.length >0 && ndtInput.attachmentpath.map((item,index)=>{
                let split1 = item.split("/")
                let split = split1[1].split("_")
                return(
                  <Form.Label><a href="#" onClick={() => {downLoad(logId,split1[1],split1[1])}} >{split[1]}</a></Form.Label>
                )
              })
              }
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default NDTInputModal;
