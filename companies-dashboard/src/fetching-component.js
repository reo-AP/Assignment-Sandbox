import "./fetch.css";
import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Fetching() {
  const [result, setResult] = useState([]);
  const [state, setState] = useState();
  const [companyData, setCompanyData] = useState([]);
  const [selected, setSelected] = useState("");

  const nevigate = useNavigate();

  const API_URL_GET_DATA = `${window.location.origin.replace(
    3000,
    4000
  )}/companies/list/`;

  const API_URL_POST_DATA = `${window.location.origin.replace(
    3000,
    4000
  )}/companies/save`;

  const handleChange = (e) => {
    setState(e.target.value);
  };
  const handleSubmit = async (e) => {
    console.log(selected);
    let data = companyData.filter((item) => {
      if (
        item.label.trim().replace(/-/g, " ") ==
        selected.trim().replace(/-/g, " ")
      ) {
        console.log("inside");
        return item;
      }
    });
    let x = data.length > 0 && {
      company_name: data[0].label,
      c_id: data[0].id,
    };
    await axios.post(API_URL_POST_DATA, x);
    if (selected) nevigate("/list");
  };

  const extractCompanyData = (parent) => {
    let localCompaniesData = [];
    for (let i = 0; i < parent.children.length; i++) {
      let temp = parent.children[i].id;
      let ar = temp.split("/");
      localCompaniesData.push({ label: ar[1], id: ar[2] });
    }
    setCompanyData(localCompaniesData);
  };

  const request = async () => {
    const resultData = state && (await axios.get(API_URL_GET_DATA + state));
    setResult(resultData?.data);
  };

  useEffect(() => {
    request();
  }, [state]);

  useEffect(() => {
    let parent = document.getElementById("result");
    parent.innerHTML = result ? result : null;
    extractCompanyData(parent);
  }, [result]);

  useEffect(() => {
    console.log("company data=====>>>>", companyData);
  }, [companyData]);

  return (
    <>
      <div className="Fetch">
        <h1>Fetching Component</h1>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={companyData}
          sx={{ width: 300 }}
          onClose={(e) => {
            setSelected(e.target.innerHTML);
          }}
          renderInput={(params) => (
            <TextField {...params} onChange={handleChange} label="Companies" />
          )}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ marginTop: "2%" }}
        >
          Submit
        </Button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            id="result"
            style={{
              display: "none",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Fetching;
