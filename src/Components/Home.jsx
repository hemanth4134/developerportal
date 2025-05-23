import React from "react";
import { Container, Navbar, Nav, Collapse, Stack, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import { PersonCircle, Book, Pencil, Person, Layers, Tools, Box, Power, Collection } from 'react-bootstrap-icons';
import { Download, CaretRightSquare, CaretDownFill, CardChecklist, CheckCircle, Wrench, LayoutTextWindowReverse } from 'react-bootstrap-icons';
import PendingLogbook from "../Components/PendingLogbook";
import ClosedLogbook from "../Components/ClosedLogbook";
import Reports from "../Components/Report";
import CreateLogBook from "../Components/CreateLogBook";
import UserMaster from "../Components/UserMaster";
import Feedback from "../Components/FeedBack";
import { useState } from "react";
import product from "../images/Godrej-aerospace.png";
import logo from "../images/Godrej_logo.png"
import home from "../images/home.png"
import MaterialMaster from "../Components/MaterialMaster"
import StageMaster from "../Components/StageMaster";
import TechniqueMaster from "../Components/TechniqueMaster";
import ProjectMaster from "../Components/ProjectMaster";
import WeldingProcessMaster from "../Components/WeldingProcessMaster";
import JobDescriptionMaster from '../Components/JobDescriptionMaster'
import { useParams } from "react-router-dom";
import { getManual, getReport } from "../services/logbook-services";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useMsal } from "@azure/msal-react";

export default function Home({ userData }) {
  const [open, setOpen] = useState(false);
  const [openSideNav, setOpenSideNav] = useState(false);
  const [active, setActive] = useState('');
  const [menuLink, setMenuLink] = useState("MenuLink");

  const { instance } = useMsal();


  function toggle() {
    setOpenSideNav(!openSideNav);
    setMenuLink(menuLink === "activeMenuLink" ? "MenuLink" : "activeMenuLink");
  }

  function selectMenu(selectedKey) {
    setActive(selectedKey);
    setOpenSideNav(false);
    setMenuLink("MenuLink");
  }

  const Wrapper = () => {
    const params = useParams();
    return (
      <Feedback match={params} />
    );
  };

  const CreateComp = () => {
    const params = useParams();
    return (<CreateLogBook match={params} flag="welder" />
    );
  };
  
  function handleLogout(instance) {  
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('Role');
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('Team');
    instance.logoutRedirect().catch(e => {
        console.error(e);
    });
    
}

async function getS3File(flag) {
    let url = "";
    let downloadName = "";
    if (flag === "Manual") {
      url = await getManual(process.env.REACT_APP_USERMANUAL_FOLDERNAME, process.env.REACT_APP_USERMANUAL).catch((err) =>
        console.error("Error in fetching User Manual File", err));
      downloadName = process.env.REACT_APP_USERMANUAL;
    const link = document.createElement('a');
    let s3Url = url.url
    link.href = s3Url;
    link.setAttribute('download', downloadName);
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    link.parentNode.removeChild(link);
  } else {
    getReport().catch((err) =>
      console.error("Error in fetching Report", err));
    alert("Report sent over mail");
  }
  }

  return (
    <div className="wrapper">

      <Navbar className="header" sticky="top">
        <Container>
          <Stack direction="horizontal" gap={5}>
            <Navbar.Brand href="/"><img  src={logo} alt="Godrej" /></Navbar.Brand>

            {/* <div className="UserLogin vr" /> */}
            <Navbar.Text><span className="UserLogin MenuHead">{process.env.REACT_APP_APPLICATION_NAME}</span></Navbar.Text>
          </Stack>
          <Navbar.Text className="justify-content-end">
            <Stack direction="horizontal" gap={2}><div className="UserLogin ms-auto">Welcome, {sessionStorage.getItem('UserName')}</div>
              {/* <PersonCircle color="white" size="35" /> */}

              {<OverlayTrigger placement="bottom"
                overlay={<Tooltip id="tooltip">{sessionStorage.getItem('UserName')}<br />{sessionStorage.getItem('Team')}</Tooltip>}>
                <PersonCircle color="white" size="35" />
              </OverlayTrigger>}

              <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => toggle()} />
            </Stack>
          </Navbar.Text>
        </Container>
      </Navbar>

      <Router>
        <Navbar expand="lg" className={openSideNav ? 'opensidenavbar sidenavbar' : 'closesidenavbar sidenavbar'}>
          <CaretRightSquare className="arrow navToggler" size="25" onClick={() => toggle()} />
          <Container>
            <div id="basic-navbar-nav">

              <Nav fill variant="tabs" activeKey={active} onSelect={(selectedKey) => { selectMenu(selectedKey) }} className="mx-auto flex-column">

                <Nav.Link as={Link} eventKey="create" to="/create"><Stack direction="horizontal" gap={2}><div className={menuLink}>Create Logbook Request</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Create Logbook Request</Tooltip>}><Pencil className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                <Nav.Link as={Link} eventKey="pending" to="/pending"><Stack direction="horizontal" gap={2}><div className={menuLink}>Pending Logbook Request</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Pending Logbook Request</Tooltip>}><CardChecklist className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                <Nav.Link as={Link} eventKey="closed" to="/closed"><Stack direction="horizontal" gap={2}><div className={menuLink}>Closed Logbook Request</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Closed Logbook Request</Tooltip>}><CheckCircle className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                <Nav.Link as={Link} eventKey="reports" to="/report" ><Stack direction="horizontal" gap={2}><div className={menuLink}>Report</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Report</Tooltip>}><Download className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                <Nav.Link eventKey="manual" onClick={() => { getS3File("Manual") }} ><Stack direction="horizontal" gap={2}><div className={menuLink}>User Manual</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">User Manual</Tooltip>}><Book className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                {sessionStorage.getItem('Role') === "Admin" && <button className="dropdown-btn nav-link" onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open} >
                  <Stack direction="horizontal" gap={2}><div className={menuLink}>Masters</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Masters</Tooltip>}><CaretDownFill className="mx-auto" /></OverlayTrigger>}</Stack></button>}
                <Collapse in={open}>
                  <div id="example-collapse-text" className="menu">
                    <Nav.Link as={Link} eventKey="material" to="/material"><Stack direction="horizontal" gap={2}><div className={menuLink}>Material Master</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Material Master</Tooltip>}><Box className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                    <Nav.Link as={Link} eventKey="project" to="/project"><Stack direction="horizontal" gap={2}><div className={menuLink}>Project Master</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Project Master</Tooltip>}><LayoutTextWindowReverse className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                    <Nav.Link as={Link} eventKey="stage" to="/stage"><Stack direction="horizontal" gap={2}><div className={menuLink}>Stage Master</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Stage Master</Tooltip>}><Layers className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                    <Nav.Link as={Link} eventKey="user" to="/user"><Stack direction="horizontal" gap={2}><div className={menuLink}>User Master</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">User Master</Tooltip>}><Person className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                    <Nav.Link as={Link} eventKey="technique" to="/technique"><Stack direction="horizontal" gap={2}><div className={menuLink}>Technique Master</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Technique Master</Tooltip>}><Tools className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                    <Nav.Link as={Link} eventKey="welding" to="/welding"><Stack direction="horizontal" gap={2}><div className={menuLink}>Welding Process Master</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Welding Process Master</Tooltip>}><Wrench className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                    <Nav.Link as={Link} eventKey="jobdesc" to="/jobdescription"><Stack direction="horizontal" gap={2}><div className={menuLink}>Job Description & Project Master</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Job Description & Project Master</Tooltip>}><Collection className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
                  </div>
                </Collapse>
                <Nav.Link onClick={() => handleLogout(instance)}><Stack direction="horizontal" gap={2}><div className={menuLink}>Logout</div>{<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Logout</Tooltip>}><Power className="mx-auto" /></OverlayTrigger>}</Stack></Nav.Link>
              </Nav>
            </div>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<img className="background" src={home} alt="Home"></img>}></Route>
        </Routes>
        <div className={openSideNav ? 'openmain main' : 'closemain main'}>

          <Routes>
            <Route exact path="/pending" element={<PendingLogbook selectMenu={selectMenu} />}></Route>
            <Route exact path="/closed" element={<ClosedLogbook />}></Route>
            <Route exact path="/report" element={<Reports />}></Route>
            <Route exact path="/create" element={<CreateLogBook />}></Route>
            <Route exact path="/user" element={<UserMaster />}></Route>
            <Route exact path="/feedback/logbookId/:logbookId" element={<Wrapper />}></Route>
            <Route exact path="/material" element={<MaterialMaster />}></Route>
            <Route exact path="/material/projectname/:project" element={<MaterialMaster />}></Route>
            <Route exact path="/stage" element={<StageMaster />}></Route>
            <Route exact path="/technique" element={<TechniqueMaster />}></Route>
            <Route exact path="/project" element={<ProjectMaster />}></Route>
            <Route exact path="/welding" element={<WeldingProcessMaster />}></Route>
            <Route exact path="/jobdescription" element={<JobDescriptionMaster/>}></Route>
            <Route exact path="/welderfeedback/:logbookId" element={<CreateComp />}></Route>
            
            <Route
              exact
              path='/jobdescription'
              element={<JobDescriptionMaster />}
            ></Route>
          </Routes>
        </div>
      </Router>

      <Navbar fixed="bottom" className={openSideNav ? 'openfooter footer' : 'closefooter footer'}>
        <Container>

          <Navbar.Text>Copyright @ 2022 | Godrej Infotech </Navbar.Text>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>	<img className="product" src={product} alt="Welding NDT Logbook" /></Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover={false}
      />

    </div>
  );
};
