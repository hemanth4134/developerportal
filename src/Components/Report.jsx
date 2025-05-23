
import React, {  useState } from 'react'
import {
  Button,
  Form,
  Col,
  Row,
  Spinner,
} from 'react-bootstrap'
import {
  getAllLogRequests,
  getFeedback,
  getWeldData,
} from '../services/report-services'
import LogbookRequestReport from './LogbookRequestReport'
import WeldingInputReport from './WeldingReport'
import NdtReport from './NdtReport'
import {current_convert, getDifferenceInDays } from '../Utility/date'
import SearchSelectMulti from '../Utility/search-select-multi'
import AllReport from './AllReport'

const Reports = () => {
  const [logreport, setLogReport] = useState([])
  const [weldingreport, setWeldingReport] = useState([])
  const [ndtreport, setNdtReport] = useState([])
  const [data, setData] = useState([])
  const [reportDownload, setReportDownload] = useState(false)
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    reportType: 'Logbook Request', endDate: current_convert(0),
    startDate: current_convert(1),
  })
  const [reportType] = useState([
    { type: 'Logbook Request' },
    { type: 'Welding input' },
    { type: 'NDT input' },
    { type: 'All' },
  ])

  const plantOptions = [
    { value: '8', label: '8' },
    { value: '16A', label: '16A' },
    { value: '4B', label: '4B' }
  ]

  async function logData() {
    let result = await getAllLogRequests(filter).catch((err) =>
      console.log('Error in fetching  details', err)
    )
    console.log('result', result)
    setLogReport(result.data)
  }

  async function weldingData() {
    let result = await getAllLogRequests(filter).catch((err) =>
      console.log('Error in fetching  details', err)
    )
    let wldinpdata = []
    for (let obj of result.data) {
      filter.logBookId = obj.logBookId;
      console.log("filter", filter)
      let wldresult = await getWeldData(filter).catch((err) =>
        console.log('Error in fetching  details', err)
      )
      if (wldresult?.data) {
        wldinpdata = [...wldinpdata, ...wldresult.data]
      }
    }
    setWeldingReport(wldinpdata)
  }

  async function ndtTable() {
    let result = await getAllLogRequests(filter).catch((err) =>
      console.log('Error in fetching  details', err)
    )
    let ndtdata = []
    for (let obj of result.data) {
      filter.logBookId = obj.logBookId;
      let ndtresult = await getFeedback(filter).catch((err) =>
        console.log('Error in fetching  details', err)
      )
      if (ndtresult?.data) {
        ndtdata = [...ndtdata, ...ndtresult.data]
      }
    }
    setNdtReport(ndtdata)
  }

  async function getAllData() {
    let data = [];
    let result = await getAllLogRequests(filter).catch((err) =>
      console.log('Error in fetching  details', err)
    )

    for (let obj of result.data) {
      filter.logBookId = obj.logBookId;
      let wldresult = await getWeldData(filter).catch((err) =>
        console.log('Error in fetching  details', err)
      )
      if (wldresult?.data) {
        data = [...data, ...wldresult.data]
      }

      let ndtresult = await getFeedback(filter).catch((err) =>
        console.log('Error in fetching  details', err)
      )
      if (ndtresult?.data) {
        data = [...data, ...ndtresult.data]
      }
    }
    setData(data)
  }

  async function getData(e) {
    e.preventDefault();
    if (validation()) {
      setLoading(true);
      console.log("reportDownload", reportDownload)
      let type = filter.reportType;
      if (type === 'Logbook Request') {
        await logData();
      }
      if (type == 'Welding input') {
        await weldingData();
      }
      if (type == 'NDT input') {
        await ndtTable();
      }
      if (type == 'All') {
        await getAllData();
      }
      setLoading(false);
    }
  }

  function validation() {
    let isValid = true;
    if (filter.endDate && filter.startDate) {
      if (filter.endDate < filter.startDate) {
        isValid = false;
        alert("Created Date From is greater than Created Date To");
      }
      let differ = getDifferenceInDays(
        filter.startDate,
        filter.endDate
      );
      if (differ && differ > "366") {
        isValid = false;
        alert("Report not allowed for more than 1 year!");
      }
    } else {
      isValid = false;
      alert("Report not allowed for more than 1 year!");
    }
    return isValid;
  }

  return (
    <div className="insideForm">
      <div className="sub-main">
        <Form
          onSubmit={(e) => { setReportDownload(true); getData(e); }}>
          <Row>
            <Col md={3} xs={6}>
              <Form.Group className='request-form-group'>
                <Form.Label className='request-form-label' htmlFor='TypeofRequest'>
                  Report Type
                </Form.Label>
                <Form.Select
                  aria-label='TypeofRequest'
                  className='request-form-select'
                  id='TypeofRequest'
                  name='TypeofRequest'
                  onChange={(e) => {
                    setFilter((prev) => ({ ...prev, reportType: e.target.value }))
                  }}
                >
                  {/* <option value=''>Select</option> */}
                  {reportType &&
                    reportType.map((item) => (
                      <option key={item.type} value={item.type}>
                        {item.type}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2} xs={6}>
              <Form.Group className='request-form-group'>
                <Form.Label
                  className='request-form-label'
                  htmlFor='CreatedDateFrom'
                >
                  Start Date
                </Form.Label>
                <Form.Control
                  className='request-form-select request-form-text date-text'
                  name='startDate'
                  type='date'
                  id='startDate'
                  value={filter.startDate}
                  required
                  onChange={(e) => {
                    setFilter((prev) => ({ ...prev, startDate: e.target.value }))
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col md={2} xs={6}>
              <Form.Group className='request-form-group'>
                <Form.Label className='request-form-label' htmlFor='CreatedDateTo'>
                  End Date
                </Form.Label>
                <Form.Control
                  className='request-form-select request-form-text date-text'
                  name='endDate'
                  type='date'
                  id='endDate'
                  value={filter.endDate}
                  required
                  onChange={(e) => {
                    setFilter((prev) => ({ ...prev, endDate: e.target.value }))
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>


            {sessionStorage.getItem('Role') == "Admin" && <Col md={3} xs={6}>
              <Form.Group className='request-form-group'>
                <Form.Label className='request-form-label' htmlFor='Plant'>
                  Plant
                </Form.Label>
                <SearchSelectMulti
                  data={plantOptions}
                  valueField={"value"}
                  labelField={"value"}
                  placeholder={"Plant"}
                  onChange={(value) => {
                    setFilter((prev) => ({ ...prev, plant: Array.from(value, (item) => item.value) }))
                  }}
                />
                {(!filter.plant || filter.plant?.length <= 0) && <input className="hidden-field-required"
                  tabIndex={-1}
                  autoComplete="off"
                  required={true} />}
              </Form.Group>
            </Col>
            }
            <br></br>
            <Col md={2} xs={6} className='report-btn'>
              <Button
                variant="outline-primary" type="submit">
                Get Details
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <br></br>
      <div className="sub-main">
        {loading && <Spinner animation="border" className="spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
        {
          reportDownload &&
          <div>
            {filter.reportType === 'Logbook Request' && logreport?.length > 0 && (
              <LogbookRequestReport logreport={logreport} />
            )}

            {filter.reportType === 'Welding input' && weldingreport?.length > 0 && (
              <WeldingInputReport weldingreport={weldingreport} />

            )}
            {filter.reportType === 'NDT input' && ndtreport?.length > 0 && (
              <NdtReport ndtreport={ndtreport} />
            )}
            {filter.reportType === 'All' && data?.length > 0 && (
              <AllReport data={data} />
            )}
          </div>
        }
      </div>
    </div>
  )
}

export default Reports
