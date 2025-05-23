import BootstrapTable from "react-bootstrap-table-next";
import React, { useEffect, useState, useRef } from "react";
import { Form, InputGroup, FormControl, Button, Stack, OverlayTrigger, Tooltip} from "react-bootstrap";
import UserMasterModal from "./UserMasterModal";
import { Pencil, Trash } from 'react-bootstrap-icons';
import { getUsers } from '../services/user-services';

const UserMaster = () => {
  const searchInput = useRef("");
  const [users, setUsers] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentRow, setCurrentRowRow] = useState(null);
  const [filteredResult, setfilteredResult] = useState(false);
  const [actions, setActions] = useState("");
  const [actionTaken, setActionTaken] = useState(false);


  function callActionTaken() {
    setActionTaken(!actionTaken)
  }

  const fetchUserMaster = async () => {
    const result = await getUsers();
    setUsers(result);
    setfilteredResult(result);
  };

  useEffect(() => {
    fetchUserMaster();
  }, [actionTaken]);

  function handleSearch(searchText) {
    if (searchText && searchText.length > 0) {
      searchText = searchText.toUpperCase();
      let filteredResult = users.filter(
        (item) =>
          item.userName.toUpperCase().indexOf(searchText) >= 0 ||
          item.userName === searchText || item.emailid === searchText
      );
      setfilteredResult(filteredResult);
    } else {
      setfilteredResult(users);
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
      dataField: "emailId",
      text: "Email ID",
      sort: true,
    },
    {
      dataField: "userName",
      text: "User Name",
      sort: true,
    },
    {
      dataField: "phoneNumber",
      text: "Phone Number",
      sort: true,
    },
    {
      dataField: "team",
      text: "Team",
      sort: true,
    },
    {
      dataField: "plant",
      text: "Plant",
      sort: true,
    },
    {
      dataField: "accessRole",
      text: "Role",
      sort: true,
    },

    {
      dataField: "active",
      text: "Active",
     },

    {
      dataField: "",
      text: "Actions",
      formatter: actionsButtons,
    },
  ];

  const defaultSorted = [
    {
      dataField: "userName",
      order: "asc",
    },
  ];

  return (
    filteredResult && (
      <div className="insideForm">
        <div className="bread-crumb">User Master</div>
        <br />
        <div className="sub-main">
        <Form>
          <InputGroup className="mb-2">
            <InputGroup.Text id="search">Search</InputGroup.Text>
            <FormControl ref={searchInput}
              onChange={() => handleSearch(searchInput.current.value)}
              placeholder="Search by User Name "
              aria-label="Search"
              aria-describedby="search"
            />
          </InputGroup>
          
        </Form>
        <div className="add-div">
        Showing records {filteredResult.length} of {users.length}
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
        {showForm && <UserMasterModal 
          userModal={users}
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

export default UserMaster;
