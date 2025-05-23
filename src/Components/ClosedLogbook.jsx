import { Table ,Form, InputGroup, FormControl ,Button, Spinner, Container } from "react-bootstrap";
import React,{ useState, useRef, useEffect } from "react";
import ViewModal from "./ViewModal";
import { getDashboard } from "../services/logbook-services";
import { getReverseSortOrder } from "../Utility/Sort";

export default function ClosedLogbook() {

  const searchInput = useRef('');
  const [closedLogbooks, setClosedLogbooks] = useState([]);
  const [filteredResult, setfilteredResult] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [logid, setlogId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      let result = await getDashboard("Closed").catch((err) =>
        console.log("Error in fetching Pending Dashboard")
      );
      setClosedLogbooks(result);
      result.sort(getReverseSortOrder("logBookId"))
      setfilteredResult(result);
      setLoading(false);
    }
    loadDashboard();
  },[]);

  function handleSearch(searchText) {
    if (searchText && searchText.length > 0) {
      searchText = searchText.toUpperCase();
      let filteredResult = closedLogbooks.filter(
        (item) =>
          item?.projectName?.toUpperCase().indexOf(searchText) >= 0 ||
          item?.jobDescription?.toUpperCase().indexOf(searchText) >= 0 ||
          item.logBookId == searchText
      );
      setfilteredResult(filteredResult);
    } else {
      setfilteredResult(closedLogbooks);
    }
          filteredResult.sort(getReverseSortOrder("logBookId"))

  }

    return  <Container className="insideForm">
    <div className="bread-crumb">Closed Logbook Request</div>
    <br/> 
    <div className="sub-main insideForm">
      { loading && <Spinner animation="border" className="spinner"  role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>}
        <Form>
            <InputGroup className="mb-3">
                <InputGroup.Text id="search">Search</InputGroup.Text>
                <FormControl ref={searchInput}
                    onChange={() => handleSearch(searchInput.current.value)}
                    placeholder="Search by Project Name,Logbook Id or Job Description"
                    aria-label="Search"
                    aria-describedby="search"
                />
            </InputGroup>
            <p>Showing records {filteredResult?.length} of {closedLogbooks.length} </p>
        </Form>

    <Table responsive>
            <thead>
                <tr>
                    <th>Logbook Id</th>
                    <th>Plant</th>
                    <th>Project Name</th>
                    <th>Job Description</th>
                    <th>Status</th>
                    <th>Submitted Date</th>
                    <th>Closed Date</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {filteredResult.map((closedLogbook, index) =>
                  <tr key={index}>
                    <td>{closedLogbook.logBookId}</td>
                    <td>{closedLogbook.plant}</td>
                    <td>{closedLogbook.projectName}</td>
                    <td>{closedLogbook.jobDescription}</td>
                    <td>Closed</td>
                    <td>{closedLogbook.submittedDate}</td>
                    <td>{closedLogbook.closedDate}</td>
                    <td>
                            <Button  size="sm" active onClick={() => { setShowForm(true); setlogId(closedLogbook.logBookId);  }}>View</Button>
                    </td>
                  </tr>
                )}
            </tbody>
        </Table> 
        { showForm && <ViewModal
            show={showForm}
            logid={logid}
            onHide={() => setShowForm(false)}

        /> }
    </div>
    </Container>
}