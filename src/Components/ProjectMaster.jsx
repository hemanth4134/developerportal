import BootstrapTable from "react-bootstrap-table-next";
import React, { useEffect, useState, useRef } from "react";
import { Button, Stack, Form, InputGroup, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap";
import ProjectMasterModal from "./ProjectMasterModal";
import { Pencil, Trash } from 'react-bootstrap-icons';
import { getProject } from '../services/material-services';

const ProjectMaster = () => {
  const searchInput = useRef("");
  const [project, setProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentRow, setCurrentRowRow] = useState(null);
  const [filteredResult, setfilteredResult] = useState(false);
  const [actions, setActions] = useState("");
  const [actionTaken, setActionTaken] = useState(false);

  function callActionTaken() {
    setActionTaken(!actionTaken)
  }

  useEffect(() => {
    async function fetchProjectMaster() {
      let result = await getProject().catch(err =>
        console.log("Error in fetching Project details", err));
      setProject(result);
      setfilteredResult(result);
    } fetchProjectMaster();
  }, [actionTaken]);

  function handleSearch(searchText) {
    if (searchText && searchText.length > 0) {
      searchText = searchText.toUpperCase();
      let filteredResult = project.filter(
        (item) =>
          item.ProjectName.toUpperCase().indexOf(searchText) >= 0 ||
          item.ProjectName === searchText
      );
      setfilteredResult(filteredResult);
    } else {
      setfilteredResult(project);
    }
  }

  const handleAction = (row, action) => {
    setActions(action)
    setShowForm(true);
    setCurrentRowRow(row);
  };


  const actionsButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Stack direction="horizontal" gap={3}>

        {<OverlayTrigger placement="right"
          overlay={<Tooltip id="tooltip">Delete</Tooltip>}>
          <Trash color="darkblue" onClick={() => { handleAction(row, "Delete") }} />
        </OverlayTrigger>}

        {<OverlayTrigger placement="right"
          overlay={<Tooltip id="tooltip">Edit</Tooltip>}>
          <Pencil color="blue" onClick={() => { handleAction(row, "Update") }} />
        </OverlayTrigger>}

      </Stack>
    );
  };

  const columns = [
    {
      dataField: "ProjectName",
      text: "Project Name",
      sort: true,
    },
    {
      dataField: "",
      text: "Actions",
      formatter: actionsButtons,
    },
  ];

  const defaultSorted = [
    {
      dataField: "ProjectName",
      order: "asc",
    },
  ];

  return (
    filteredResult && (
      <div className="insideForm">
        <div className="bread-crumb">Project Master</div>
        <br />
        <div className="sub-main">
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text id="search">Search</InputGroup.Text>
              <FormControl ref={searchInput}
                onChange={() => handleSearch(searchInput.current.value)}
                placeholder="Search by Project Name "
                aria-label="Search"
                aria-describedby="search"
              />
            </InputGroup>
            </Form>
            <div className="add-div">
            Showing records {filteredResult.length} of {project.length}  
            <Button className="add-button"
              variant="outline-info"
              onClick={() => { setActions("Add"); setCurrentRowRow(null); setShowForm(true); }}
            >
              Add New
            </Button>
          </div>
          
          
          <div className="insideTable">
            <BootstrapTable
              striped
              keyField="Sequence"
              data={filteredResult}
              columns={columns}
              defaultSorted={defaultSorted}
              condensed
            />
          </div>
          {showForm && <ProjectMasterModal
            projModal={project}
            callActionTaken={callActionTaken}
            actions={actions}
            show={showForm}
            row={currentRow}
            onHide={() => setShowForm(false)}
          />}
        </div>
      </div>
    )
  );
};

export default ProjectMaster;
