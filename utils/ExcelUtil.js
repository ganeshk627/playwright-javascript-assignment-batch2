import * as XLSX from 'xlsx'


export function readTestDataFromExcel(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    const testData= XLSX.utils.sheet_to_json(sheet);
    // console.log(testData)
    return testData;
  }