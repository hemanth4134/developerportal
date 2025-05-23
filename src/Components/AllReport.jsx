import BootstrapTable from "react-bootstrap-table-next";
import ExcelExportHelper from "../Utility/ExcelExportHelper";

export default function AllReport(props) {

 const columns = [
    {
      dataField: "logBookId",
      text: "Logbook Id",
      // sort: true,
      column:"A"
    },
    {
      dataField: "welderIteration",
      text: "Welding Team Iterations",
      // sort: true,
       column:"B"
    },
    {
      dataField: "NDTIteration",
      text: "NDT Team Iterations",
      column:"C"
    },
    {
      dataField: "CreatedOn",
      text: "Created",
      // sort: true,
      column:"D"
    },
    {
      dataField: "plant",
      text: "Plant",
      // sort: true,
      column:"E"
    },
    {
      dataField: "projectName",
      text: "Project Name",
      column:"F"
    },
    {
      dataField: "materialName",
      text: "Material Name",
      // sort: true,
      column:"G"
    },
    {
      dataField: "welderName",
      text: "Welder Name",
      // sort: true,
      column:"H"
    },
    {
      dataField: "type",
      text: "Type",
      // sort: true,
      column:"I"
    },
    {
      dataField: "drawingNo",
      text: "Drawing No",
      // sort: true,
      column:"J"
    },
    {
      dataField: "seamNo",
      text: "Seam No",
      // sort: true,
      column:"K"
    },
    {
      dataField: "identification",
      text: "Identification",
      // sort: true,
      column:"L"
    },
    {
      dataField: "jobDescription",
      text: "Job Description",
      // sort: true,
      column:"M"
    },
    {
      dataField: "stage",
      text: "Stage",
      // sort: true,
      column:"N"
    },
    {
      dataField: "thickness",
      text: "Thickness",
      // sort: true,
      column:"O"
    },
    {
      dataField: "NDE",
      text: "NDE",
      // sort: true,
      column:"P"
    },
    {
      dataField: "weldingProcess",
      text: "Welding Process",
      // sort: true,
      column:"Q"
    },
    {
      dataField: "remarks",
      text: "Remarks from Welding Team",
      // sort: true,
      column:"R"
    },
    {
      dataField: "Remarks",
      text: "Remarks From NDT Team",
      column:"S"
      // sort: true,
    },
    {
      dataField: "spotsvalue",
      text: "No Of Spots",
     
      column:"T"
    },
    {
      dataField: "repairspots",
      text: " Repair spots",
     
      column:"U"
    },
    {
      dataField: "DispositionText",
      text: "Disposition",
     
      column:"V"
    },
    {
      dataField: "OkText",
      text: "Ok",
     
      column:"W"
    },
    {
      dataField: "PorewithTailText",
      text: "PorewithTail",
     
      column:"X"
       
    },
    {
      dataField: "IsolatedPorosityText",
      text: "IsolatedPorosity",
     
      column:"Y"
    },
    {
      dataField: "AllignedPorosityText",
      text: "AlignedPorosity",
      
      column:"Z"
    },
    {
      dataField: "ChainPorosityText",
      text: "ChainPorosity",

      column:"AA"
    },
    {
      dataField: "ClusterPorosityText",
      text: "ClusterPorosity",
  
      column:"AB"
    },
    {
      dataField: "LinearIndicationText",
      text: "LinearIndication",
    
      column:"AC"
    },
    {
      dataField: "TungstenInclusionText",
      text: "TungstenInclusion",
     
      column:"AD"
    },
    {
      dataField: "MergeText",
      text: "Merge",
    
      column:"AE"
    },
    {
      dataField: "UndercutText",
      text: "Undercut",
    
      column:"AF"
    },
    {
      dataField: "UnderfillText",
      text: "Underfill",
    
      column:"AG"
    },
    {
      dataField: "LackofFusionText",
      text: "LackofFusion",
     
      column:"AH"
    },
    {
      dataField: "InterpassFusionText",
      text: "InterpassFusion",
   
      column:"AI"
    },
    {
      dataField: "LackofPenetrationText",
      text: "LackofPenetration",
    
      column:"AJ"
    },
    {
      dataField: "SuckBackText",
      text: "SuckBack",
   
      column:"AK"
    },
    {
      dataField: "OxidationText",
      text: "Oxidation",
      
      column:"AL"
    },
    {
      dataField: "ConcavityText",
      text: "Concavity",
     
      column:"AM"
    },
    {
      dataField: "CrackText",
      text: "Crack",
     
      column:"AN"
    },
    {
      dataField: "PositiveRecallText",
      text: "PositiveRecall",
     
      column:"AO"
    },
    {
      dataField: "ProcessMarkNumber",
      text: "ProcessMark",
     
      column:"AP"
    },
    {
      dataField: "LightleakNumber",
      text: "Lightleak",
      
      column:"AQ"
    },
    {
      dataField: "WatermarkNumber",
      text: "Watermark",
      
      column:"AR"
    },
    {
      dataField: "ScrathmarkNumber",
      text: "Scrathmark",
      column:"AS"
    },
    {
      dataField: "WrongTechniqueNumber",
      text: "WrongTechnique",
      
      // sort: true,
      column:"AT"
    },
    {
      dataField: "CrimpmarkNumber",
      text: "Crimpmark",
     
      // sort: true,
      column:"AU"
    },
    {
      dataField: "HighDensityNumber",
      text: "HighDensity",
     
      // sort: true,
      column:"AV"
    },
    {
      dataField: "LowDensityNumber",
      text: "LowDensity",
      
      // sort: true,
      column:"AW"
    },
    {
      dataField: "TypeofFilm",
      text: "Type of Film",
      
      // sort: true,
      column:"AX"
    },
    {
      dataField: "NoOfFilms",
      text: "No Of Films",
     
      // sort: true,
      column:"AY"
    },
    {
      dataField: "Current_Curie",
      text: "Current",
    
      // sort: true,
      column:"AZ"
    },
    {
      dataField: "Voltage_KV",
      text: "Voltage",
      
      // sort: true,
      column:"BA"
    },
    {
      dataField: "ExposureTime_min",
      text: "Exposure Time",
     
      // sort: true,
      column:"BB"
    },
    {
      dataField: "FocalSize",
      text: "Focal Size",
    
      // sort: true,
      column:"BC"
    },
    {
      dataField: "IQI",
      text: "IQI",
      // sort: true,
      column:"BD"
    },
    {
      dataField: "SFD",
      text: "SFD",
      // sort: true,
      column:"BE"
    },
    {
      dataField: "WeldCategory",
      text: "WeldCategory",
      // sort: true,
      column:"BF"
    },
    {
      dataField: "FilmSize",
      text: "Film Size",
     
      // sort: true,
      column:"BG"
    },
    {
      dataField: "Sensitivity",
      text: "Sensitivity",
     
      // sort: true,
      column:"BH"
    },
    {
      dataField: "technicianName",
      text: "Name of Technician",
      column:"BI"
      // sort: true,
    },
    {
      dataField: "Technique",
      text: "Technique",
      column:"BJ"
      // sort: true,
    },
  ];

 return(
  <div>
  <ExcelExportHelper reqfilterdata={props.data} reqheader={columns} />
  <div className='insideTable'> 
     {props.data &&
            <BootstrapTable
              striped
              keyField="Sequence"
              data={props.data}
              columns={columns}
              condensed
            />}
  </div></div>
 )
}