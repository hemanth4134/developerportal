import React, { Component } from "react";
import { Button, Col, Container, Form, Row, Stack, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { addLogbookData, getJobDescriptions, getWelderData, submitFiles } from "../services/logbook-services";
import { getMaterials, getProject, getStages, getWeldingProcess } from "../services/material-services";
import {getLinkedProj} from "../services/jobdesc-services"
import { getTeamUser, getActiveUsers } from "../services/user-services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchSelect from "../Utility/search-select";

class CreateLogBook extends Component {


    constructor(props) {
        super(props);
        this.state = {
            formdata: {
                logbook: {
                    plant: '',
                    projectName: '',
                    jobDescription: '',
                    seamNo: ''
                },
                welder: {
                    materialName: '',
                    welderName: '',
                    projectName: '',
                    type: '',
                    drawingNo: '',
                    plant: '',
                    jobDescription: '',
                    identification: '',
                    seamNo: '',
                    stage: '',
                    thickness: '',
                    NDE: '',
                    remarks: '',
                    weldingProcess: ''
                },
            },
            errors: {
                fileError: '',
            },
            files: [],
            plantOptions: [
                { value: '8', label: '8' },
                { value: '16A', label: '16A' },
                { value: '4B', label: '4B' }
            ],
            projectOptions: [],
            materialOptions: [],
            welderOptions: [],
            stageOptions: [],
            JobDescription: [],
            JobDescriptionAll: [],
            WeldingOption: [],
            SeamOption: [],
            thicknessOption: [],
            mailCC: [],
            plantCondition: false,
            redirect: false,
            loading: true,
            logBookId: (this.props.match !== "" && this.props.match !== undefined && this.props.match.logbookId) ? this.props.match.logbookId : "",
            flag: (this.props.flag !== "" && this.props.flag !== undefined && this.props.flag === "welder") ? true : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        //this.handleJobDesc = this.handleJobDesc.bind(this);
        this.handleSeam = this.handleSeam.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleReset = this.handleReset.bind(this);

    }

    handleReset() {
        this.setState(this.initialState);
        this.setState({
            loading: false
        });
    }

    async componentDidMount() {
        let projects = await getProject()
            .catch(err => console.log("Error in loading Project data", err));
        let materials = await getMaterials()
            .catch(err => console.log("Error in loading material data", err));
        let stage = await getStages()
            .catch(err => console.log("Error in loading stage data", err));
        let weldingProcess = await getWeldingProcess()
            .catch(err => console.log("Error in loading Welding Process data", err));
        let jobDescMaster = await getJobDescriptions()
            .catch(err => console.log("Error in loading Job Description data", err));
        let welderMaster = await getTeamUser("Welding Team")
            .catch(err => console.log("Error in loading Welder Master data", err));
        let users = await getActiveUsers()
            .catch(err => console.log("Error in loading Users", err));
        //console.log('welderMaster', welderMaster);
        this.setState({
            materialOptions: materials,
            projectOptions: projects,
            stageOptions: stage,
            WeldingOption: weldingProcess,
            JobDescriptionAll: jobDescMaster,
            welderOptions: welderMaster,
            mailCC: users
        });
        this.initialState = { ...this.state }
        if (this.state.flag) {
            let welderData = await getWelderData(this.state.logBookId).catch(err => console.log("Error in loading Welder data", err));
            for (let key in welderData) {
                if ( key != "jobDescription"){
                     this.setState({
                        ...this.state,
                         formdata: {
                            logbook: {
                              ...this.state.formdata.logbook
                            },
                            welder: {
                              ...this.state.formdata.welder, [key]: welderData[key]
                            }
                        }
                    })
                }
            }
            let jobDescriptionList = await getLinkedProj(welderData.projectName).catch((err) =>
            console.log('Error in fetching  details', err))
            this.setState({
                    ...this.state,
                    JobDescription:jobDescriptionList,
                    welder: {
                            ...this.state.formdata.welder,jobDescription:""
                        }

            })
            //this.handleJobDesc();
        }

        this.setState({
            loading: false
        });

        if (this.state.formdata.welder.plant === "16A") {
            this.setState({
                plantCondition: true
            });
        } else if (this.state.formdata.welder.plant !== "16A") {
            this.setState({
                plantCondition: false
            });
        }
        //console.log('state', this.state);
    }

    handleChange(e) {
        console.log("e", e)
        const { name, value } = e.target;
        console.log(name, value)
        const { formdata } = this.state;
        if (e.target.id.includes("logbook")) {
            this.setState({
                formdata: {
                    welder: {
                        ...formdata.welder, [name]: value,
                    },

                    logbook: {
                        ...formdata.logbook, [name]: value,
                    },
                }
            });
        }
        else {
            this.setState({
                formdata: {
                    logbook: {
                        ...formdata.logbook
                    },
                    welder: {
                        ...formdata.welder, [name]: value,
                    }
                }
            });
            //console.log('state', this.state);
        }

        if (e.target.name === "plant" && e.target.value === "16A") {
            this.setState({
                plantCondition: true
            });
        }
        else if (e.target.name === "plant" && e.target.value !== "16A") {
            this.setState({
                plantCondition: false
            });
        }
    }

    handleFile(e) {
        let files = e.target.files;
        this.setState({
            files: files,
        });
    }

     async fetchLinkedData(e) {
      let result1 = await getLinkedProj(e.target.value).catch((err) =>
        console.log('Error in fetching  details', err)
      )
        // this.setState({
        //     JobDescription:result1
        // });

        this.setState({
                    ...this.state,
                    JobDescription:result1,
                    formdata: {
                        logbook: {
                            ...this.state.formdata.logbook,jobDescription: ""
                        },
                        welder: {
                            ...this.state.formdata.welder,jobDescription: ""
                        }
                    }
                })}

    handleJobDescSearch(value) {
        const { formdata } = this.state;
        this.setState({
            formdata: {
                welder: {
                    ...formdata.welder, jobDescription: value,
                },

                logbook: {
                    ...formdata.logbook, jobDescription: value,
                },
            }
        });
        let seamOptions = this.state.JobDescriptionAll.filter((item) => item.JobDescription === value);
        this.setState({
            SeamOption: seamOptions
        })
    }

    // handleJobDesc(e) {
    //     let jobSelValue = (e == null) ? this.state.formdata.welder.jobDescription : e.target.value;
    //     let seamOptions = this.state.JobDescription.filter((item) => item.JobDescription === jobSelValue);
    //     //console.log('seam options', seamOptions);
    //     this.setState({
    //         SeamOption: seamOptions
    //     })
    // }

    handleSeam(e) {
        let thicknessOption = this.state.SeamOption.filter((item) => item.SeamNo === e.target.value);
         this.setState({
                    ...this.state,
                    formdata: {
                        logbook: {
                            ...this.state.formdata.logbook, seamNo: e.target.value
                        },
                        welder: {
                            ...this.state.formdata.welder,seamNo:  e.target.value,thickness:  thicknessOption[0].Thickness, NDE: thicknessOption[0].ExtentOfNDT,
                        }
                    }
                })
    }

    handleSelect(e) {
        const selected = [];
        let selectedOption = (e.target.selectedOptions);

        for (let i = 0; i < selectedOption.length; i++) {
            selected.push(selectedOption.item(i).value)
        }
        this.setState({
            formdata: {
                logbook: { ...this.state.formdata.logbook },
                welder: { ...this.state.formdata.welder, mailCC: selected }
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
            this.setState({ errors: { ...errors, fileError: '  Maximum number of attachments reached, Only 6 Files are allowed.' } })
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
            this.setState({ errors: { ...errors, fileError: '  Maximum file size reached, file size should be less than 2MB.' } })
        }
        return isValid;
    }

    async handleSubmit(e) {
        let fileNameArray = []
        e.preventDefault();
        if (this.validate()) {
            if (this.state.flag) {
                this.state.formdata.logBookId = this.state.logBookId
            }
            this.state.formdata.createFlag = this.state.flag
            if(this.state.files.length > 0){
                for(let fileName of this.state.files){
                    console.log("fileName",fileName.name)
                    fileNameArray.push(fileName.name)
                }
                this.state.formdata.fileData = fileNameArray
            }
            console.log("state inside the submit",this.state.formdata)
            let result = await addLogbookData(this.state.formdata).catch(err => { console.log('Error in adding Logbook Request', err); toast.error(err.response.data.message) });
            console.log("result",result)
            if (result !== "" && result !== undefined && result) {
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


    render() {
        if (this.state.redirect) {
            return (< Navigate to={"/pending"} ></Navigate >)
        }
        return (
            <Container className="insideForm">
                {!this.state.flag && <div className="bread-crumb">Create New Logbook Request</div>}
                {this.state.flag && <div className="bread-crumb">Welder Input Details</div>}
                <br />
                <div className="sub-main LogbookForm">

                    {this.state.loading && <Spinner animation="border" className="spinner" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}

                    <Form onSubmit={this.handleSubmit} >
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 required" controlId="logbook_Plant">
                                    <Form.Label>Plant</Form.Label>
                                    <Form.Select required size="sm" name="plant" value={this.state.formdata.welder.plant} onChange={this.handleChange} disabled={this.state.flag} >
                                        <option value="">Select Plant</option>
                                        {this.state.plantOptions.map((item, index) => {
                                            return <option key={index} value={item.value}>{item.label}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group></Col>
                            <Col>
                                <Form.Group className="mb-2 required" controlId="logbook_Projectname">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Select required size="sm" aria-label="Projectname" name="projectName" value={this.state.formdata.welder.projectName} onChange={e => {this.handleChange(e);this.fetchLinkedData(e)}} disabled={this.state.flag}>
                                        <option value="">Select Project</option>
                                        {this.state.projectOptions.map((item, index) => {
                                            return <option key={index} value={item.ProjectName}>{item.ProjectName}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 required" controlId="Materialname">
                                    <Form.Label>Material Name</Form.Label>
                                    <Form.Select required size="sm" aria-label="Materialname" name="materialName" value={this.state.formdata.welder.materialName} onChange={this.handleChange}>
                                        <option value="">Select Material</option>
                                        {this.state.materialOptions.map((item, index) => {
                                            return <option key={index} value={item.MaterialName}>{item.MaterialName}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group></Col>
                            <Col>
                                <Form.Group className="mb-2 required" controlId="Weldername">
                                    <Form.Label>Welder Name</Form.Label>
                                    <Form.Select required size="sm" aria-label="Weldername" name="welderName" onChange={this.handleChange}>
                                        <option value="">Select Welder</option>
                                        {this.state.welderOptions.map((item, index) => {
                                            return <option key={index} value={item.userName}>{item.userName}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="Type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control size="sm" type="text" name="type" onChange={this.handleChange} placeholder="Enter Type" disabled={this.state.plantCondition} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="Drawingno">
                                    <Form.Label>Drawing No.</Form.Label>
                                    <Form.Control size="sm" type="text" name="drawingNo" maxLength="255" onChange={this.handleChange} placeholder="Enter Drawing Number " disabled={this.state.plantCondition} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="logbook_JobDesc">
                                    <Form.Label>Job Description</Form.Label>
                                    {!this.state.plantCondition && <Form.Control size="sm" type="text" maxLength="255" value={this.state.formdata.welder.jobDescription} name="jobDescription" onChange={this.handleChange} placeholder="Enter Job Description " />}
                                    {/* {this.state.plantCondition && <Form.Select size="sm" aria-label="jobDescription" name="jobDescription" value={this.state.formdata.welder.jobDescription} onChange={(e) => { this.handleChange(e); this.handleJobDesc(e) }}>
                                        <option value="">Select Job Description</option>
                                        {this.state.JobDescription.map((item, index) => {
                                            return <option key={index} value={item.JobDescription}>{item.JobDescription}</option>
                                        })}
                                    </Form.Select>} */}
                                   {this.state.plantCondition  && this.state.JobDescription && <SearchSelect data={this.state.JobDescription } valueField={"JobDescription"} value={this.state.formdata.welder.jobDescription}
                                    // labelField={"JobDescription"} 
                                    // placeholder={"Job Description"} 
                                    // onChange={(value) => { this.handleJobDescSearch(value) 
                                    labelField={"JobDescription"} 
                                    placeholder={"Job Description"} 
                                    onChange={(value) => { this.handleJobDescSearch(value) 
                                    }}
                                    ></SearchSelect>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="Identification">
                                    <Form.Label>Identification</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="identification" onChange={this.handleChange} placeholder="Enter Identification" />

                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="logbook_Seam">
                                    <Form.Label>Seam Number</Form.Label>
                                    {!this.state.plantCondition && <Form.Control size="sm" type="text" maxLength="255" value={this.state.formdata.welder.seamNo} name="seamNo" onChange={this.handleChange} placeholder="Enter Seam Number" />}
                                    {this.state.plantCondition && <Form.Select size="sm" aria-label="seamNo" name="seamNo" value={this.state.formdata.welder.seamNo} onChange={(e) => { this.handleSeam(e) }}>
                                        <option value="">Select Seam Number</option>
                                        {this.state.SeamOption.map((item, index) => {
                                            return <option key={index} value={item.SeamNo}>{item.SeamNo}</option>
                                        })}
                                    </Form.Select>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2 required" controlId="Stage">
                                    <Form.Label>Stage</Form.Label>
                                    <Form.Select required size="sm" aria-label="Stage" name="stage" onChange={this.handleChange}>
                                        <option value="">Select Stage</option>
                                        {this.state.stageOptions.map((item, index) => {
                                            return <option key={index} value={item.Stages}>{item.Stages}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="thickness">
                                    <Form.Label>Thickness</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="thickness" value={this.state.formdata.welder.thickness} onChange={this.handleChange} placeholder="Enter Thickness" />

                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="NDE">
                                    <Form.Label>Extent of NDT</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="NDE" value={this.state.formdata.welder.NDE} onChange={this.handleChange} placeholder="Enter Extent of NDT" />

                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="Remarks">
                                    <Form.Label>Remarks</Form.Label>
                                    <Form.Control size="sm" type="text" maxLength="255" name="remarks" onChange={this.handleChange} placeholder="Enter Remarks" />

                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="Attachment">
                                    <Form.Label>Attachment</Form.Label>
                                    <Form.Control size="sm" multiple type="file" name="files" onChange={this.handleFile} placeholder="Upload Attachment" />
                                    <div className="text-danger">{this.state.errors.fileError}</div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.state.plantCondition &&
                                    <Form.Group className="mb-2" controlId="WeldingProcess">
                                        <Form.Label>Welding Process</Form.Label>
                                        <Form.Select size="sm" aria-label="WeldingProcess" name="weldingProcess" value={this.state.formdata.welder.weldingProcess} onChange={this.handleChange}>
                                            <option value="">Select Welding Process</option>
                                            {this.state.WeldingOption.map((item, index) => {
                                                return <option key={index} value={item.WeldingProcess}>{item.WeldingProcess}</option>
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                }
                            </Col>
                            <Col>
                                {this.state.flag &&
                                    <Form.Group className="mb-2" controlId="mailCC">
                                        <Form.Label>Send Mail to(CC)</Form.Label>
                                        <Form.Select multiple size="sm" aria-label="mailCC" name="mailCC" onChange={this.handleSelect}>
                                            <option value="">Select Users</option>
                                            {this.state.mailCC.map((item, index) => {
                                                return <option key={index} value={item.emailId}>{item.emailId}</option>
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                }</Col>
                        </Row>
                        <Container className="FormButtons">
                            <Stack direction="horizontal" gap={4}>
                                <Button variant="primary" type="submit">Submit</Button>
                                <Button variant="secondary" type="reset" onClick={this.handleReset}>Cancel</Button>
                            </Stack>
                        </Container>
                    </Form>
                </div>
            </Container >

        )
    }
}

export default CreateLogBook