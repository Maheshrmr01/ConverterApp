import React, { useState } from 'react'
import * as xlsx from 'xlsx';
import jsPDF from 'jspdf';

function Converter() {
    const [data, setData] = useState([])


    //read contents from Xlsx and convert to json
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                console.log(json);
                setData(json);

            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }

        //export to pdf
        const generatePdf = (exportData) => {
            // Create a new jsPDF instance
            const doc = new jsPDF();
    
            // Loop through each object in the JSON data
            exportData.forEach((item, index) => {
                // Create a new page for each object except the first one
                if (index >0) {
                    doc.addPage();
                }
    
                // Add data to the PDF
                doc.text(`Segment: ${item.Segment}`, 10, 10);
                doc.text(`Country: ${item.Country}`, 10, 20);
                doc.text(`Product: ${item[' Product ']}`, 10, 30);
                doc.text(`Discount Band: ${item[' Discount Band ']}`, 10, 40);
                doc.text(`Units Sold: ${item['Units Sold']}`, 10, 50);
                // Add more fields as needed
    
                // Save the PDF with a unique name (e.g., based on the data)
    
            });
            doc.save(`Report_sdfds.pdf`);
        };

    return (
        <>
            <form>
                <label htmlFor="upload">Upload File</label>
                <input
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={readUploadFile}
                />
                {data !== "" ?
                    <button onClick={() => { generatePdf(data) }}>export all data as pdf</button>
                    : <></>}
            </form>
            {data.map((item, index) =>
                                    <div key={index}>
                                    <h1 key={index}>segment:{item.Segment}</h1>
                                    <button key={index} onClick={() => {generatePdf([item]) }}>Export</button>
                                    </div>
                                    )
            }
        </>
    )
}

export default Converter