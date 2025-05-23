import BootstrapTable from "react-bootstrap-table-next";
import React, { useEffect, useState, useRef } from "react";
import { Button, Stack, Form, InputGroup, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap";
import StageMasterModal from "./StageMasterModal";
import { Pencil, Trash } from 'react-bootstrap-icons';
import { getStages } from '../services/material-services';

const StageMaster = () => {
  const searchInput = useRef("");
  const [stages, setStages] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentRow, setCurrentRowRow] = useState(null);
  const [filteredResult, setfilteredResult] = useState(false);
  const [actions, setActions] = useState("");
  const [actionTaken, setActionTaken] = useState(false);

  function callActionTaken() {
    setActionTaken(!actionTaken)
  }


  useEffect(() => {
    async function fetchStageMaster() {
      let result = await getStages().catch(err =>
        console.log("Error in fetching StageMaster details", err));
      setStages(result);
      setfilteredResult(result);
    } fetchStageMaster();
  }, [actionTaken]);

  function handleSearch(searchText) {
    if (searchText && searchText.length > 0) {
      searchText = searchText.toUpperCase();
      let filteredResult = stages.filter(
        (item) =>
          item.Stages.toUpperCase().indexOf(searchText) >= 0 ||
          item.Stages === searchText
      );
      setfilteredResult(filteredResult);
    } else {
      setfilteredResult(stages);
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
      dataField: "Stages",
      text: "Stage Name",
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
      dataField: "Stages",
      order: "asc",
    },
  ];


  return (
    filteredResult && (
      <div className="insideForm">
        <div className="bread-crumb">Stage Master</div>
        <br />
        <div className="sub-main">
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text id="search">Search</InputGroup.Text>
              <FormControl ref={searchInput}
                onChange={() => handleSearch(searchInput.current.value)}
                placeholder="Search by Stage Name "
                aria-label="Search"
                aria-describedby="search"
              />
            </InputGroup>
          </Form>
          <div className="add-div">
            Showing records {filteredResult.length} of {stages.length}
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
          {showForm && <StageMasterModal
            stageModal={stages}
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

export default StageMaster;
