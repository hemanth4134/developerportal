import BootstrapTable from "react-bootstrap-table-next";
import ExcelExportHelper from "../Utility/ExcelExportHelper";

export default function WeldingInputReport(props) {

 const columns = [
    {
      dataField: "logBookId",
      text: "Logbook Id",
      // sort: true,
      column:"A"
      
    },
    {
      dataField: "welderIteration",
      text: "Welder iterations",
      // sort: true,
       column:"B"
    },
    {
      dataField: "plant",
      text: "Plant",
      // sort: true,
       column:"C"
    },
    {
      dataField: "projectName",
      text: "Project Name",
      // sort: true,
      column:"D"

    },
    {
      dataField: "materialName",
      text: "Material Name",
      // sort: true,
      column:"E"

    },
    {
      dataField: "welderName",
      text: "Welder Name",
      // sort: true,
      column:"F"
    },
    {
      dataField: "type",
      text: "Type",
      // sort: true,
      column:"G"
    },
    {
      dataField: "drawingNo",
      text: "Drawing No",
      // sort: true,
      column:"H"
    },
    {
      dataField: "seamNo",
      text: "Seam No",
      // sort: true,
      column:"I"
    },
    {
      dataField: "identification",
      text: "Identification",
      // sort: true,
      column:"J"
    },
    {
      dataField: "jobDescription",
      text: "Job Description",
      // sort: true,
      column:"K"
    },
    {
      dataField: "stage",
      text: "Stage",
      // sort: true,
      column:"L"
    },
    {
      dataField: "thickness",
      text: "Thickness",
      // sort: true,
      column:"M"
    },
    {
      dataField: "NDE",
      text: "NDE",
      // sort: true,
      column:"N"
    },
    {
      dataField: "remarks",
      text: "Remarks from welding team",
      // sort: true,
      column:"O"
    },
    {
      dataField: "weldingProcess",
      text: "Welding Process",
      // sort: true,
      column:"P"
    },
    {
      dataField: "CreatedOn",
      text: "Created",
      // sort: true,
      column:"Q"
    },
    
  ];

 return(
  <div>
  <ExcelExportHelper reqfilterdata={props.weldingreport} reqheader={columns} />
  <div className='insideTable'>
      {props.weldingreport &&
            <BootstrapTable
              striped
              keyField="Sequence"
              data={props.weldingreport}
              columns={columns}
              condensed
            />}
  </div>
  </div>
 )
}