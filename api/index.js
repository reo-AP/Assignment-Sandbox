const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const { CompanyModel } = require("./models/companies");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/companies/list/:search", async (req, res) => {
  const data = {
    search: req.params.search,
    filter: "company",
  };

  let url = process.env.COMPANIES_API_URL;
  const response = await axios.post(url, new URLSearchParams(data));
  console.log(response.data);
  const responseData = response.data.replace(/\t/g, "").replace(/\n/g, "");
  res.send(responseData);
});

app.post("/companies/save", async (req, res) => {
  const body = req.body;
  console.log(req.body);
  const response = await CompanyModel.create(body)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return "Error Occured";
    });
  res.send(response);
});

app.get("/local/companies/list", async (req, res) => {
  const data = await CompanyModel.findAll()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  res.send(data);
});

app.listen(process.env.PORT, () => {
  console.log("listening at port 4000");
});
