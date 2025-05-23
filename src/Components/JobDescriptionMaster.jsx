import BootstrapTable from 'react-bootstrap-table-next'
import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  Stack,
  Form,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import JobDescriptionMasterModal from './JobDescriptionMasterModal'
import { Pencil } from 'react-bootstrap-icons'
import { getProject } from '../services/material-services'
import { getJobDecProj } from '../services/jobdesc-services'
import { getJobDescriptions } from '../services/logbook-services'

const JobDescriptionMaster = () => {
  const searchInput = useRef('')
  const [projJobdesc, setProjJobdesc] = useState([])
  const [jobdescription, setJobDescription] = useState([])
  const [projectNameList, setProjectNameList] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentRow, setCurrentRowRow] = useState(null)
  const [filteredResult, setfilteredResult] = useState(false)
  const [actions, setActions] = useState('')
  const [actionTaken, setActionTaken] = useState(false)

  function callActionTaken() {
    setActionTaken(!actionTaken)
  }

  useEffect(() => {
    async function fetchJobDescriptionMaster() {
      let result = await getJobDecProj().catch((err) =>
        console.log('Error in fetching JobDescriptionMaster details', err)
      )
      setProjJobdesc(result)
      setfilteredResult(result)

    }
   
    fetchJobDescriptionMaster()
  }, [actionTaken])

  useEffect(() => {
    async function fetchProjectName() {
      let result = await getProject().catch((err) =>
        console.log('Error in fetching ProjectName details', err)
      )
      setProjectNameList(result)
   
    }
    fetchProjectName()
  
    async function fetchJobDescription() {
         let jobDescMaster = await getJobDescriptions()
            .catch(err => console.log("Error in loading Job Description data", err));
        let uniqueJobDesc = jobDescMaster.filter( (ele, ind) => ind === jobDescMaster.findIndex( elem => elem.JobDescription === ele.JobDescription))
            setJobDescription(uniqueJobDesc)
    }
    fetchJobDescription()
  }, [])

  

  function handleSearch(searchText) {
    if (searchText && searchText.length > 0) {
      searchText = searchText.toUpperCase()
      let filteredResult = projJobdesc.filter(
        (item) =>
          item?.JobDescription?.toUpperCase().indexOf(searchText) >= 0 ||
          item?.ProjectName?.toUpperCase().indexOf(searchText) >= 0 
      )
      setfilteredResult(filteredResult)
    } else {
      setfilteredResult(projJobdesc)
    }
  }

  const handleAction = (row, action) => {
    setActions(action)
    setShowForm(true)
    setCurrentRowRow(row)
  }

  const actionsButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Stack direction='horizontal' gap={3}>
       
        {
          <OverlayTrigger
            placement='right'
            overlay={<Tooltip id='tooltip'>Edit</Tooltip>}
          >
            <Pencil
              color='blue'
              onClick={() => {
                handleAction(row, 'Update')
              }}
            />
          </OverlayTrigger>
        }
      </Stack>
    )
  }

  const columns = [
    {
      dataField: 'JobDescription',
      text: 'Job Description ',
      sort: true,
    },
   
    {
      dataField: 'ProjectName',
      text: 'Project Name',
      sort: true,
    },
     {
      dataField: "Active",
      text: "Active",
    },
     {
      dataField: "",
      text: "Actions",
      formatter: actionsButtons,
    },
  ]

  const defaultSorted = [
    {
      dataField: 'Job Description',
      order: 'asc',
    },
  ]

  return (
    filteredResult && (
      <div className='insideForm'>
        <div className='bread-crumb'>Job Description & Project Master</div>
        <br />
        <div className='sub-main'>
          <Form>
            <InputGroup className='mb-3'>
              <InputGroup.Text id='search'>Search</InputGroup.Text>
              <FormControl
                ref={searchInput}
                onChange={() => handleSearch(searchInput.current.value)}
                placeholder='Search by Job Description or Project Name '
                aria-label='Search'
                aria-describedby='search'
              />
            </InputGroup>
          </Form>
          <div className='add-div'>
            Showing records {filteredResult.length} of {projJobdesc.length}
            <Button
              className='add-button'
              variant='outline-info'
              onClick={() => {
                setActions('Add')
                setCurrentRowRow(null)
                setShowForm(true)
              }}
            >
              Add New
            </Button>
          </div>

          <div className='insideTable'>
            <BootstrapTable
              striped
              keyField='Sequence'
              data={filteredResult}
              columns={columns}
              defaultSorted={defaultSorted}
              condensed
            />
          </div>
          {showForm && (
            <JobDescriptionMasterModal
              jobdescModal={projJobdesc}
              projectNameList={projectNameList}
              jobdescription={jobdescription}
              callActionTaken={callActionTaken}
              actions={actions}
              show={showForm}
              row={currentRow}
              onHide={() => setShowForm(false)}
            />
          )}
        </div>
      </div>
    )
  )
}

export default JobDescriptionMaster
