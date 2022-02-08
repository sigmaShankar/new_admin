import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

const columns = [
  {
   name: "name",
   label: "Name",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "company",
   label: "Company",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "city",
   label: "City",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "state",
   label: "State",
   options: {
    filter: true,
    sort: false,
   }
  },
 ];
  
 const data = [
  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
 ];

export default function Payment() {
  return (
    <>
      <PageTitle title="Payments" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Payment Details"
            data={datatableData}
            columns={["Name", "Company", "City", "State"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding>
            <Table data={mock.table} />
          </Widget>
        </Grid> */}
      </Grid>
    </>
  );
}
