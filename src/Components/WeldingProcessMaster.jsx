import BootstrapTable from "react-bootstrap-table-next";
import React, { useEffect, useState, useRef } from "react";
import { Button, Stack, Form, InputGroup, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap";
import WeldingProcessMasterModal from "./WeldingProcessMasterModal";
import { Pencil, Trash } from 'react-bootstrap-icons';
import { getWeldingProcess } from '../services/material-services';

const WeldingProcessMaster = () => {
  const searchInput = useRef("");
  const [WeldingProcess, setWeldingProcess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentRow, setCurrentRowRow] = useState(null);
  const [filteredResult, setfilteredResult] = useState(false);
  const [actions, setActions] = useState("");
  const [actionTaken, setActionTaken] = useState(false);

  function callActionTaken() {
    setActionTaken(!actionTaken)
  }

  useEffect(() => {
    async function fetchWeldingProcessMaster() {
      let result = await getWeldingProcess().catch(err =>
        console.log("Error in fetching WeldingProcessMaster details", err));
      setWeldingProcess(result);
      setfilteredResult(result);
    } fetchWeldingProcessMaster();
  }, [actionTaken]);

  function handleSearch(searchText) {
    if (searchText && searchText.length > 0) {
      searchText = searchText.toUpperCase();
      let filteredResult = WeldingProcess.filter(
        (item) =>
          item.WeldingProcess.toUpperCase().indexOf(searchText) >= 0 ||
          item.WeldingProcess === searchText
      );
      setfilteredResult(filteredResult);
    } else {
      setfilteredResult(WeldingProcess);
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
      dataField: "WeldingProcess",
      text: "WeldingProcess Name",
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
      dataField: "WeldingProcess",
      order: "asc",
    },
  ];



  return (
    filteredResult && (
      <div className="insideForm">
        <div className="bread-crumb">WeldingProcess Master</div>
        <br />
        <div className="sub-main">
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text id="search">Search</InputGroup.Text>
              <FormControl ref={searchInput}
                onChange={() => handleSearch(searchInput.current.value)}
                placeholder="Search by WeldingProcess Name "
                aria-label="Search"
                aria-describedby="search"
              />
            </InputGroup>
          </Form>
          <div className="add-div">
            Showing records {filteredResult.length} of {WeldingProcess.length}
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
          {showForm && <WeldingProcessMasterModal
            weldModal={WeldingProcess}
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

export default WeldingProcessMaster;
