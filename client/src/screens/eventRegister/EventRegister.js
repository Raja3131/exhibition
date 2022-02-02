import React from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { Grid, Button, TextField } from "@mui/material";
import { DatePicker,} from "@mui/lab";
// import { KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useState } from "react";

const EventRegister = () => {

  const {
    register,
    control,
    handleSubmit,
    reset

  } = useForm();

  const onSubmit = (e) => {
    console.log(e);
    axios
      .post("http://localhost:5000/events", e)
      .then((res) => {
        console.log(res);
      }
      );

 
  };

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
          <TextField onChange={onChange} value={value} label={"Description"} />
        )}
      />
      <Controller
        name={"location"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField onChange={onChange} value={value} label={"Location"} />
        )}
      />
    
<Button style={{marginLeft:5}} type="submit">Submit</Button> 
<Button style={{marginLeft:5}} onClick={reset}>Reset</Button>
      </form>
     
    </>
  );
};

export default EventRegister;
