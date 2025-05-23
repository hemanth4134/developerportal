import React from 'react'
import * as XLSX from 'xlsx'
import * as XlsxPopulate from 'xlsx-populate/browser/xlsx-populate'
import { Button } from 'react-bootstrap'

const ExcelExportHelper = ({ reqfilterdata, reqheader }) => {
  async function createDownLoadData() {
    if (reqfilterdata) {
      handleExport(reqfilterdata).then((url) => {
        const downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute('href', url)
        downloadAnchorNode.setAttribute('download', 'Report.xlsx')
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
      })
    }
  }

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',
    }

    const wbout = XLSX.write(workbook, wopts)

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: 'application/octet-stream',
    })

    return blob
  }

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length)

    //create a 8 bit integer array
    const view = new Uint8Array(buf)
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i)
    }

    return buf
  }

  const handleExport = (data) => {
    let finalData = []

    let lastcolumn = 'A'
    let obj = {}
    for (let row of reqheader) {
      let key = row.column
      obj[[key]] = row.text
      lastcolumn = key
    }
    finalData.push(obj)

    data.forEach((item) => {
      let obj = {}
      for (let row of reqheader) {
        let key = row.column
        obj[[key]] = item[row.dataField]
      }
      finalData.push(obj)
    })
    

    //create a new workbook
    const wb = XLSX.utils.book_new()

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
      autoFilter: true,
    })

    XLSX.utils.book_append_sheet(wb, sheet, 'Report')

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.

    const workbookBlob = workbook2blob(wb)
    const dataInfo = {
      tbodyRange: `A2:${lastcolumn}${finalData.length}`,
      theadRange: `A1:${lastcolumn}1`,
    }

    const headerColumn = finalData[0]

    return addStyle(workbookBlob, dataInfo, headerColumn)
  }

  const addStyle = (workbookBlob, dataInfo, headerColumn) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.usedRange().style({
          fontFamily: 'Calibri',
          verticalAlignment: 'center',
        })

        let length=Object.keys(headerColumn).length;      
        for (let i = 1; i <= length; i++) {
          sheet.column(i).width(20)
          
        }

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            border: 'thin',
            horizontalAlignment: 'left',
          })
        }

        sheet.range(dataInfo.theadRange).style({
          fill: '0577b',
          border: 'thin',
          bold: true,
          fontColor: 'FFFFFF',
          horizontalAlignment: 'left',
        })
      })

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob))
    })
  }

  return (
    <Button variant="outline-primary" 
      className='download-btn'
      onClick={() => {
        createDownLoadData()
      }}
      size='l'
    >
      DOWNLOAD
    </Button>
  )
}

export default ExcelExportHelper
