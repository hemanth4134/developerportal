import { Table, Form, InputGroup, FormControl, Button, Spinner, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Pencil } from "react-bootstrap-icons";
import React, { useState, useRef, useEffect } from "react";
import ViewModal from "./ViewModal";
import { getDashboard } from "../services/logbook-services";
import {getReverseSortOrder} from  "../Utility/Sort" 
export default function PendingLogbook(props) {
  const searchInput = useRef("");
  const [pendingLogbooks, setPendingLogbooks] = useState([]);
  const [filteredResult, setfilteredResult] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [logid, setlogId] = useState("");
  const [loading, setLoading] = useState(true);
  const role = sessionStorage.getItem('Team') === "NDT Team" ? false : true;

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      let result = await getDashboard("Pending").catch((err) =>
        console.log("Error in fetching Pending Dashboard")
      );
      setPendingLogbooks(result);
      result.sort(getReverseSortOrder("logBookId"))
      setfilteredResult(result);
      setLoading(false);
    }
    loadDashboard(); props.selectMenu("pending");
  }, []);

  function handleSearch(searchText) {
    if (searchText && searchText.length > 0) {
      searchText = searchText.toUpperCase();
      let filteredResult = pendingLogbooks.filter(
        (item) =>
          item?.projectName?.toUpperCase().indexOf(searchText) >= 0 ||
          item?.jobDescription?.toUpperCase().indexOf(searchText) >= 0 ||
          item?.logBookId == searchText
      );
      setfilteredResult(filteredResult);
        filteredResult.sort(getReverseSortOrder("logBookId"))
    } else {
      setfilteredResult(pendingLogbooks);
    }
            filteredResult.sort(getReverseSortOrder("logBookId"))

  }

  return <Container className="insideForm">
    <div className="bread-crumb">Pending Logbook Request</div>
    <br />
    <div className="sub-main insideForm">
      {loading && <Spinner animation="border" className="spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>}

      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="search">Search</InputGroup.Text>
          <FormControl ref={searchInput}
            onChange={() => handleSearch(searchInput.current.value)}
            placeholder="Search by Project Name,LogBook Id or Job Description"
            aria-label="Search"
            aria-describedby="search"
          />
        </InputGroup>
        <p>Showing records {filteredResult?.length} of {pendingLogbooks?.length} </p>
      </Form>

      <Table responsive>
        <thead>
          <tr>
            <th>Logbook Id</th>
            <th>Plant</th>
            <th>Project Name</th>
            <th>Job Description</th>
            <th>Pending With</th>
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredResult.map((pendingLogbook, index) =>
            <tr key={index}>
              <td>{pendingLogbook.logBookId}</td>
              <td>{pendingLogbook.plant}</td>
              <td>{pendingLogbook.projectName}</td>
              <td>{pendingLogbook.jobDescription}</td>
              <td>{pendingLogbook.logStatus}</td>
              <td>{pendingLogbook.submittedDate}</td>
              <td>
                <Button size="sm" active onClick={() => { setShowForm(true); setlogId(pendingLogbook.logBookId); }}>View</Button>
              </td>

              <td>{role && <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">edit</Tooltip>}><Link to={`/welderfeedback/${pendingLogbook.logBookId}`}><Pencil /></Link></OverlayTrigger>}
                {!role && <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">edit</Tooltip>}><Link to={`/feedback/logbookId/${pendingLogbook.logBookId}`}><Pencil /></Link></OverlayTrigger>}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {showForm && <ViewModal
        show={showForm}
        logid={logid}
        onHide={() => setShowForm(false)}

      />}
    </div>
  </Container>
}