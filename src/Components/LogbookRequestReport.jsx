import BootstrapTable from "react-bootstrap-table-next";
import ExcelExportHelper from "../Utility/ExcelExportHelper";

export default function LogbookRequestReport(props) {

 const columns = [
    {
      dataField: "logBookId",
      text: "Logbook Id",
      // sort: true,
      column:"A"
    },
    {
      dataField: "plant",
      text: "Plant",
      // sort: true,
      column:"B"
    },
    {
      dataField: "projectName",
      text: "Project Name",
      // sort: true,
      column:"C"
    },
    {
      dataField: "logStatus",
      text: "Status",
      // sort: true,
      column:"D"
    },
    {
      dataField: "submittedDate",
      text: "Submitted Date",
      // sort: true,
      column:"E"
    },
    {
      dataField: "closedDate",
      text: "Closed Date",
      // sort: true,
      column:"F"
    },
    {
      dataField: "jobDescription",
      text: "Job Description",
      // sort: true,
      column:"G"
    },
    {
      dataField: "seamNo",
      text: "Seam No",
      // sort: true,
      column:"H"
    },
  ];

 return(
  <div>
  <ExcelExportHelper reqfilterdata={props.logreport} reqheader={columns} />
  <div className='insideTable'> 
     {props.logreport &&
            <BootstrapTable
              striped
              keyField="Sequence"
              data={props.logreport}
              columns={columns}
              condensed
            />}
  </div></div>
 )
}