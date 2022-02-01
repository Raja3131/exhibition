import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {Grid,Button,TextField,} from '@mui/material'
import {DatePicker,DateTimePicker} from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';

const EventRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                variant="outlined"
                {...register("message", {
                  required: "Required",
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                {...register("message", {
                  required: "Required",
                })}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                name="location"
                label="Location"
                variant="outlined"
                {...register("message", {
                  required: "Required",
                })}
              />
            </Grid>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <Grid item xs={12}>
                <DateTimePicker
                  name="time"
                  label="Time"
                  variant="outlined"
                  inputVariant="outlined"
                  {...register("message", {
                    required: "Required",
                  })}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </LocalizationProvider>
            <Grid item xs={12}>
              <TextField
                name="image"
                label="Image"
                variant="outlined"
                {...register("message", {
                  required: "Required",
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={errors.length > 0}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
    </>
  );
}
         

export default EventRegister;
