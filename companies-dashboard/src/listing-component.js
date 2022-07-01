import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const API_URL = `${window.location.origin.replace(
  3000,
  4000
)}/local/companies/list/`;
const Listing = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetch() {
      let data = await axios.get(API_URL);
      setList(
        data.data.map((item, index) => {
          return { ...item, id: index };
        })
      );
    }
    fetch();
  }, []);
  useEffect(() => {
    console.log(list);
  }, [list]);

  const [columnDefs2] = useState([
    { field: "id", headerName: "ID", width: 50 },
    { field: "company_name", headerName: "Company Name", width: 120 },
    { field: "c_id", headerName: "Company CIN", width: 120 },
  ]);

  const table2 = (
    <div style={{ height: 400, width: 300 }}>
      <DataGrid
        rows={list}
        columns={columnDefs2}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "20vh" }}
    >
      <h1>Listing Component</h1>
      {table2}
      <Link to="/">
        <div style={{ textAlign: "center" }}>
          <h3>Return to Fetch</h3>
        </div>
      </Link>
    </div>
  );
};

export default Listing;
