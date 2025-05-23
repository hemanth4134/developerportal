import BootstrapTable from "react-bootstrap-table-next";
import ExcelExportHelper from "../Utility/ExcelExportHelper";

export default function NdtReport(props) {

 const columns = [
    {
      dataField: "logBookId",
      text: "Logbook Id",
      column:"A"
    },
    {
      dataField: "NDTIteration",
      text: "NDT Iterations",
     
      column:"B"
    },
    {
      dataField: "spotsvalue",
      text: "No Of Spots",
      column:"C"
    },
    {
      dataField: "repairspots",
      text: " Repair spots",
      column:"D"
    },
    {
      dataField: "DispositionText",
      text: "Disposition",
     
      column:"E"
    },
    {
      dataField: "OkText",
      text: "Ok",
     
      column:"F"
    },
    {
      dataField: "PorewithTailText",
      text: "PorewithTail",
     
      column:"G"
       
    },
    {
      dataField: "IsolatedPorosityText",
      text: "IsolatedPorosity",
     
      column:"H"
    },
    {
      dataField: "AllignedPorosityText",
      text: "AllignedPorosity",
      
      column:"I"
    },
    {
      dataField: "ChainPorosityText",
      text: "ChainPorosity",

      column:"J"
    },
    {
      dataField: "ClusterPorosityText",
      text: "ClusterPorosity",
  
      column:"K"
    },
    {
      dataField: "LinearIndicationText",
      text: "LinearIndication",
    
      column:"L"
    },
    {
      dataField: "TungstenInclusionText",
      text: "TungstenInclusion",
     
      column:"M"
    },
    {
      dataField: "MergeText",
      text: "Merge",
    
      column:"N"
    },
    {
      dataField: "UndercutText",
      text: "Undercut",
    
      column:"O"
    },
    {
      dataField: "UnderfillText",
      text: "Underfill",
    
      column:"P"
    },
    {
      dataField: "LackofFusionText",
      text: "LackofFusion",
     
      column:"Q"
    },
    {
      dataField: "InterpassFusionText",
      text: "InterpassFusion",
   
      column:"R"
    },
    {
      dataField: "LackofPenetrationText",
      text: "LackofPenetration",
    
      column:"S"
    },
    {
      dataField: "SuckBackText",
      text: "SuckBack",
   
      column:"T"
    },
    {
      dataField: "OxidationText",
      text: "Oxidation",
      
      column:"U"
    },
    {
      dataField: "ConcavityText",
      text: "Concavity",
     
      column:"V"
    },
    {
      dataField: "CrackText",
      text: "Crack",
     
      column:"W"
    },
    {
      dataField: "PositiveRecallText",
      text: "PositiveRecall",
     
      column:"X"
    },
    {
      dataField: "ProcessMarkNumber",
      text: "ProcessMark",
     
      column:"Y"
    },
    {
      dataField: "LightleakNumber",
      text: "Lightleak",
      
      column:"Z"
    },
    {
      dataField: "WatermarkNumber",
      text: "Watermark",
      
      column:"AA"
    },
    {
      dataField: "ScrathmarkNumber",
      text: "Scrathmark",
      column:"AB"
    },
    {
      dataField: "WrongTechniqueNumber",
      text: "WrongTechnique",
      
      // sort: true,
      column:"AC"
    },
    {
      dataField: "CrimpmarkNumber",
      text: "Crimpmark",
     
      // sort: true,
      column:"AD"
    },
    {
      dataField: "HighDensityNumber",
      text: "HighDensity",
     
      // sort: true,
      column:"AE"
    },
    {
      dataField: "LowDensityNumber",
      text: "LowDensity",
      
      // sort: true,
      column:"AF"
    },
    {
      dataField: "TypeofFilm",
      text: "Type of Film",
      
      // sort: true,
      column:"AG"
    },
    {
      dataField: "NoOfFilms",
      text: "No Of Films",
     
      // sort: true,
      column:"AH"
    },
    {
      dataField: "Current_Curie",
      text: "Current",
    
      // sort: true,
      column:"AI"
    },
    {
      dataField: "Voltage_KV",
      text: "Voltage",
      
      // sort: true,
      column:"AJ"
    },
    {
      dataField: "ExposureTime_min",
      text: "Exposure Time",
     
      // sort: true,
      column:"AK"
    },
    {
      dataField: "FocalSize",
      text: "Focal Size",
    
      // sort: true,
      column:"AL"
    },
    {
      dataField: "IQI",
      text: "IQI",
     
      // sort: true,
      column:"AM"
    },
    {
      dataField: "SFD",
      text: "SFD",
      
      // sort: true,
      column:"AN"
    },
    {
      dataField: "WeldCategory",
      text: "WeldCategory",
     
      // sort: true,
      column:"AO"
    },
    {
      dataField: "FilmSize",
      text: "Film Size",
     
      // sort: true,
      column:"AP"
    },
    {
      dataField: "Sensitivity",
      text: "Sensitivity",
     
      // sort: true,
      column:"AQ"
    },
    {
      dataField: "technicianName",
      text: "Name of Technician",
      column:"AR"
      // sort: true,
    },
    {
      dataField: "Remarks",
      text: "Remarks from NDT",
      column:"AS"
      // sort: true,
    },
    {
      dataField: "Technique",
      text: "Technique",
      column:"AT"
      // sort: true,
    },
    {
      dataField: "CreatedOn",
      text: "Created",
      column:"AU"
      // sort: true,
    },
   ];

     return(
      <div>
      <ExcelExportHelper reqfilterdata={props.ndtreport} reqheader={columns} />
      <div className='insideTable'>
     {props.ndtreport &&
            <BootstrapTable
              striped
              keyField="Sequence"
              data={props.ndtreport}
              columns={columns}
              condensed
            />}
  </div></div>
 )
  }