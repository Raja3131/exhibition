import React from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { Button, TextField } from "@mui/material";
// import { DatePicker } from "@mui/lab";
// import DateFnsUtils from "@date-io/date-fns";
// import DateAdapter from "@mui/lab/AdapterDayjs";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import Stack from "@mui/material/Stack";
import axios from "axios";
import { useState,useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

const EventRegister = () => {
  const[getData, setData] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    reset,
    errors,
    formState: { isSubmitSuccessful },
  } = useForm({});

useEffect(() => {
  axios.get("http://localhost:5000/shops").then((res) => {
    console.log(res.data);
    setData(res.data);
  });
  
} ,[])

  const onSubmit = (e) => {
    console.log(e);
    axios.post("http://localhost:5000/shops", e).then((res) => {
      console.log(res);
      const newData = [...getData, res.data];
      setData(newData);
    });
  };
  const columns = [
    {
      field: "title",
      headerName: "Event Name",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,
    },
  ]
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={"title"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} value={value} label={"Title"} />
          )}
        />
        <Controller
          name={"description"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label={"Description"}
            />
          )}
        />
        <Controller
          name={"location"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} value={value} label={"Location"} />
          )}
        />

        <Button style={{ marginLeft: 5 }} type="submit">
          Submit
        </Button>
        <Button style={{ marginLeft: 5 }} onClick={reset}>
          Reset
        </Button>
      </form>
      
          <DevTool control={control} />
     <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          columnDefs={columns}
          rowData={getData}
        />
      </div>


    </>
  );
};

export default EventRegister;
