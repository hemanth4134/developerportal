import React, { Component } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { addFeedbackData, getJobDescData, getLogbookData, submitFiles } from "../services/logbook-services";
import { getTechnique } from "../services/material-services";
import { getTeamUser, getActiveUsers } from "../services/user-services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class FeedBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: {
                logBookId: this.props.match.logbookId,
                plant: '',
                JobDescription: '',
                TypeofFilm: '',
                NoOfFilms: '',
                Technique: '',
                Current_Curie: "",
                Voltage_KV: "",
                ExposureTime_min: "",
                FocalSize: '',
                SFD: "",
                WeldCategory: '',
                IQI: '',
                Sensitivity: '',
                FilmSize: '',
                projectName: '',
                Remarks: ''
            },
            errors: {
                fileError: ''
            },
            loading: true,
            files: [],
            techniqueOptions: [],
            technicianNameOptions: [],
            mailCCOptions: [],
            switches: {
                Dispositioninput: true,
                okinput: true,
                tailinput: true,
                isolatedPorosityInput: true,
                alignedPorosityInput: true,
                chainPorosityInput: true,
                clusterPorosityInput: true,
                linearIndicationInput: true,
                tungstenInclusionInput: true,
                mergeInput: true,
                undercutInput: true,
                underfillInput: true,
                lackFusionInput: true,
                interpassFusionInput: true,
                lackPenetrationInput: true,
                suckBackInput: true,
                oxidationInput: true,
                concavityInput: true,
                crackInput: true,
                positiveRecallInput: true,
                processMarkInput: true,
                LightleakInput: true,
                waterMarkInput: true,
                scrathmarkInput: true,
                wrongTechniqueInput: true,
                crimpmarkInput: true,
                highDensityInput: true,
                lowDensityInput: true
            }


        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        console.log("state feedback",this.state)
    }

    handleChange(e) {
        const e1 = e.target;
        this.setState({
            switches: {
                ...this.state.switches,
                [e1.id]: !e1.checked
            }
        })
        //console.log(this.state);
    }

    handleInput(e) {
        const { name, value } = e.target;
        const { feedback } = this.state;
        this.setState({
            feedback: {
                ...feedback, [name]: value,
            }
        });
    }

    handleFile(e) {
        let files = e.target.files;
        this.setState({
            files: files,
        });
    }

    handleSelect(e) {
        const selected = [];
        let selectedOption = (e.target.selectedOptions);

        for (let i = 0; i < selectedOption.length; i++) {
            selected.push(selectedOption.item(i).value)
        }
        this.setState({
            feedback: {
                ...this.state.feedback, mailCC: selected
            }
        })
    }

    validate() {
        let isValid = true;
        let fileSize = 0;
        let fileNames = [];
        let format = /[`!@#$%^&*()+={};':"\\|,<>/?~]/;
        //let blockedExtensions = ['ade', 'adp', 'apk', 'appx', 'appxbundle', 'bat', 'cab', 'chm', 'cmd', 'com', 'cpl', 'dll', 'dmg', 'ex', 'ex_', 'exe', 'hta', 'ins', 'isp', 'iso', 'jar', 'js', 'jse', 'lib', 'lnk', 'mde', 'msc', 'msi', 'msix', 'msixbundle', 'msp', 'mst', 'nsh', 'pif', 'ps1', 'scr', 'sct', 'shb', 'sys', 'vb', 'vbe', 'vbs', 'vxd', 'wsc', 'wsf', 'wsh', 'zip', 'jsp', 'asp', 'undefined']; //used whitelist approach instead of blacklist and extensions are in env file.
        let allowedExtensions = process.env.REACT_APP_FILE_EXTENSIONS;
        const { errors } = this.state;
        let fileValid = this.state.files;
        if (fileValid.length > 6) {
            isValid = false;
            this.setState({ errors: { ...errors, fileError: 'Maximum number of attachments reached, Only 6 Files are allowed.' } })
        }
        for (const key of Object.keys(this.state.files)) {
            if (format.test(this.state.files[key].name)) {
                isValid = false;
                this.setState({
                    errors: {
                        ...errors,
                        fileError: "  Special Characters not allowed in FileName.",
                    },
                });
            }
            //added to check number of dots in file name.
            if (this.state.files[key].name.match(/\./g).length !== 1) {
                isValid = false;
                this.setState({
                    errors: {
                        ...errors,
                        fileError: `  Please correct FileName it conatins ${this.state.files[key].name.match(/\./g).length} dots.`,
                    },
                });
            }
            fileSize = fileSize + this.state.files[key].size;
            fileNames.push((this.state.files[key].name.indexOf('.') > 0) ? this.state.files[key].name.split('.').pop().toLowerCase() : 'undefined');
        }
        fileNames.forEach(value => {
            if (!allowedExtensions.includes(value)) {
                isValid = false;
                this.setState({ errors: { ...errors, fileError: '  Unsupported FileType.' } });
            }
        });
        if (fileSize > 2097152) {
            isValid = false;
            this.setState({ errors: { ...errors, fileError: 'Maximum file size reached, file size should be less than 2MB.' } })
        }
        return isValid;
    }

    async handleSubmit(e) {
        let fileNameArray = []
        e.preventDefault();
        if (this.validate()) {
            if(this.state.files?.length>0){
                for(let fileName of this.state.files){
                    fileNameArray.push(fileName.name)
                }
                this.state.feedback.fileData = fileNameArray
            }
            console.log("feedback data",this.state.feedback)
            let result = await addFeedbackData(this.state.feedback).catch(err => { console.log(err); toast.error(err.response.data.message) });
            console.log("result",result)
            if (result) {
                for(let urlObj of result.data.s3Url){
                    for(let fileDetails of this.state.files){
                        if(urlObj.fileName === fileDetails.name){
                            await submitFiles(urlObj.url,fileDetails)
                        }
                    }
                   }
                this.setState({ redirect: true });
                toast.success(result.data.message);
            }
        }
    }

    async componentDidMount() {
        let techniqueOpt = await getTechnique().catch(err => console.log("Error in loading Technique data"));
        let technicianNameOpt = await getTeamUser("NDT Team").catch(err => console.log("Error in loading NDT Team data"));
        let users = await getActiveUsers().catch(err => console.log("Error in loading Users"));
        this.setState({
            techniqueOptions: techniqueOpt,
            technicianNameOptions: technicianNameOpt,
            mailCCOptions: users
        });
        let jobDesc_Seam = await getLogbookData(this.state.feedback.logBookId);
        if (jobDesc_Seam !== "" && typeof jobDesc_Seam !== "undefined" && jobDesc_Seam) {
            this.setState({
                feedback: { ...this.state.feedback, plant: jobDesc_Seam.plant, projectName: jobDesc_Seam.projectName }
            });
            if (jobDesc_Seam.jobDescription !== "" && jobDesc_Seam.seamNo !== "" && typeof jobDesc_Seam.seamNo !== "undefined" && typeof jobDesc_Seam.jobDescription !== "undefined" && jobDesc_Seam.jobDescription && jobDesc_Seam.seamNo) {
                let jobDescMasterData = await getJobDescData(jobDesc_Seam.jobDescription, jobDesc_Seam.seamNo);
                for (let key in jobDescMasterData) {
                    const chars = { '/': '_', '(': '_', ')': '' };
                    let replacedkey = key.replace(/[/()]/g, m => chars[m]);
                    this.setState({
                        ...this.state,
                        feedback: { ...this.state.feedback, [replacedkey]: jobDescMasterData[key] }
                    });
                }
            }
        }
        this.setState({
            loading: false
        });
    }




    render() {

        if (this.state.redirect) {
            return <Navigate to={"/pending"}></Navigate>
        }
        return (
            <Container className="insideForm">
                <div className="bread-crumb">Feedback</div>
                <br />
                <div className="sub-main LogbookForm">

                    {this.state.loading && <Spinner animation="border" className="spinner" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}

                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 required">
                                    <Form.Label>No of Spots</Form.Label>
                                    <Form.Control size="sm" type="number" name="spotsvalue" placeholder="Enter Number of Spots" onChange={this.handleInput} required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2 required">
                                    <Form.Label>Repair spots</Form.Label>
                                    <Form.Control size="sm" type="number" name="repairspots" placeholder="Enter Number of Repair Spots" onChange={this.handleInput} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-2">
                            <Form.Label className="FeedbackLabel" >Disposition</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Disposition"
                                        type="switch"
                                        id="Dispositioninput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.Dispositioninput} type="text" name="DispositionText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2" size="sm">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="OK"
                                        type="switch"
                                        id="okinput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.okinput} type="text" name="OkText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Pore with Tail"
                                        type="switch"
                                        id="tailinput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.tailinput} type="text" name="PorewithTailText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Isolated Porosity"
                                        type="switch"
                                        id="isolatedPorosityInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.isolatedPorosityInput} type="text" name="IsolatedPorosityText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Aligned Porosity"
                                        type="switch"
                                        id="alignedPorosityInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.alignedPorosityInput} type="text" name="AllignedPorosityText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Chain Porosity"
                                        type="switch"
                                        id="chainPorosityInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.chainPorosityInput} type="text" name="ChainPorosityText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Cluster Porosity"
                                        type="switch"
                                        id="clusterPorosityInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.clusterPorosityInput} type="text" name="ClusterPorosityText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Linear Indication"
                                        type="switch"
                                        id="linearIndicationInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.linearIndicationInput} type="text" name="LinearIndicationText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Tungsten Inclusion"
                                        type="switch"
                                        id="tungstenInclusionInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.tungstenInclusionInput} type="text" name="TungstenInclusionText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Merge"
                                        type="switch"
                                        id="mergeInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.mergeInput} type="text" name="MergeText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Undercut"
                                        type="switch"
                                        id="undercutInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.undercutInput} type="text" name="UndercutText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="underfill"
                                        type="switch"
                                        id="underfillInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.underfillInput} type="text" name="UnderfillText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Lack of Fusion"
                                        type="switch"
                                        id="lackFusionInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.lackFusionInput} type="text" name="LackofFusionText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Interpass Fusion"
                                        type="switch"
                                        id="interpassFusionInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.interpassFusionInput} type="text" name="InterpassFusionText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Lack of Penetration"
                                        type="switch"
                                        id="lackPenetrationInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.lackPenetrationInput} type="text" name="LackofPenetrationText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Suck Back"
                                        type="switch"
                                        id="suckBackInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.suckBackInput} type="text" name="SuckBackText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Oxidation"
                                        type="switch"
                                        id="oxidationInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.oxidationInput} type="text" name="OxidationText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Concavity"
                                        type="switch"
                                        id="concavityInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.concavityInput} type="text" name="ConcavityText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Crack"
                                        type="switch"
                                        id="crackInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.crackInput} type="text" name="CrackText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Positive Recall"
                                        type="switch"
                                        id="positiveRecallInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" maxLength="255" readOnly={this.state.switches.positiveRecallInput} type="text" name="PositiveRecallText" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label className="FeedbackLabel" >Process Defect</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Process Mark"
                                        type="switch"
                                        id="processMarkInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" readOnly={this.state.switches.processMarkInput} type="number" name="ProcessMarkNumber" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Lightleak"
                                        type="switch"
                                        id="LightleakInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" readOnly={this.state.switches.LightleakInput} type="number" name="LightleakNumber" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Water Mark"
                                        type="switch"
                                        id="waterMarkInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" readOnly={this.state.switches.waterMarkInput} type="number" name="WatermarkNumber" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Scrathmark"
                                        type="switch"
                                        id="scrathmarkInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" readOnly={this.state.switches.scrathmarkInput} type="number" name="ScrathmarkNumber" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="WrongTechnique"
                                        type="switch"
                                        id="wrongTechniqueInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" readOnly={this.state.switches.wrongTechniqueInput} type="number" name="WrongTechniqueNumber" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="Crimpmark"
                                        type="switch"
                                        id="crimpmarkInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" readOnly={this.state.switches.crimpmarkInput} type="number" name="CrimpmarkNumber" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="HighDensity"
                                        type="switch"
                                        id="highDensityInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" readOnly={this.state.switches.highDensityInput} type="number" name="HighDensityNumber" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Row>
                                <Col>
                                    <Form.Check
                                        label="LowDensity"
                                        type="switch"
                                        id="lowDensityInput"
                                        onChange={this.handleChange}
                                    /></Col>
                                <Col>
                                    <Form.Control size="sm" readOnly={this.state.switches.lowDensityInput} type="number" name="LowDensityNumber" onChange={this.handleInput} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Type of Film</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="TypeofFilm" value={this.state.feedback.TypeofFilm} onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>No of Films</Form.Label>
                                    <Form.Control size="sm" type="number" maxLength="255" name="NoOfFilms" value={this.state.feedback.NoOfFilms} onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Form.Label className="FeedbackLabel" >RT Parameters</Form.Label>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Current</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="Current_Curie" value={this.state.feedback.Current_Curie} onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Voltage</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="Voltage_KV" value={this.state.feedback.Voltage_KV} onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Exposure Time (min)</Form.Label>
                                    <Form.Control size="sm" type="number" maxLength="255" step=".1" name="ExposureTime_min" value={this.state.feedback.ExposureTime_min} onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Focal Size</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="FocalSize" value={this.state.feedback.FocalSize} onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>IQI</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="IQI" value={this.state.feedback.IQI} onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>SFD</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="SFD" value={this.state.feedback.SFD} onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Weld Category</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="WeldCategory" value={this.state.feedback.WeldCategory} onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Film Size</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="FilmSize" value={this.state.feedback.FilmSize} onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Sensitivity</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="Sensitivity" value={this.state.feedback.Sensitivity} onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Remarks</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="Remarks" onChange={this.handleInput} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Technique</Form.Label>
                                    <Form.Select name="Technique" value={this.state.feedback.Technique} onChange={this.handleInput}  >
                                        <option value="">Select Technique</option>
                                        {this.state.techniqueOptions?.map((item, index) => {
                                            return <option key={index} value={item.Technique}>{item.Technique}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Name of Technician</Form.Label>
                                    <Form.Select name="technicianName" value={this.state.feedback.technicianName} onChange={this.handleInput}  >
                                        <option value="">Select Technician Name</option>
                                        {this.state.technicianNameOptions.map((item, index) => {
                                            return <option key={index} value={item.userName}>{item.userName}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="attachment">
                                    <Form.Label>Attachment</Form.Label>
                                    <Form.Control size="sm" multiple type="file" name="Attachment" placeholder="Upload Attachment" onChange={this.handleFile} />
                                    <div className="text-danger">{this.state.errors.fileError}</div>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Send Mail to CC</Form.Label>
                                    <Form.Select size="sm" multiple name="mailCC" value={this.state.feedback.mail} onChange={this.handleSelect} >
                                        <option value="">Select Users</option>
                                        {this.state.mailCCOptions.map((item, index) => {
                                            return <option key={index} value={item.emailId}>{item.emailId}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Container className="FormButtons">
                            <Button variant="success" type="submit">Submit</Button>
                        </Container>
                    </Form>
                </div>
            </Container >
        )
    }
}

export default FeedBack;