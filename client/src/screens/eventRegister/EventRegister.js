import { Button, DialogContent, Grid, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { createFilterOptions } from "@mui/material/Autocomplete";
import DatePicker from '../../components/datepicker/DatePicker';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box } from "@mui/system";
import { Dialog } from "@mui/material";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import swal from "sweetalert";
import { Update } from '../../components/alerts/Update';
import { Success } from "../../components/alerts/Success";
import moment from "moment";
// import "../App.css";
import { CSVLink, CSVDownload } from "react-csv";
// import "./styles.css";
// import { getData } from "./../Redux/Action/EventAction/Action";
import { Autocomplete } from '@mui/material';

const filterOptions = createFilterOptions({
  stringify: (option) => option.name,
});

export default function Location() {
  const Location_URL = "http://localhost:5000/locations";
  let curdate = new Date();

  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(false);
  const [action, setAction] = useState("");

  const [getData, setGetData] = useState([]);
  const [countryVal, setCountryVal] = useState([]);
  const [stateVal, setStateVal] = useState([]);
  const [cityVal, setCityVal] = useState([]);

  const [countrycode, setCountrycode] = useState("");

  const [enddate, setEndDate] = useState(null);
  const [startdate, setStartDate] = useState(null);
  const [descrip, setDescrip] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [image, setImage] = useState("");

  // const [edit, setEdit] = useState({})
  const [open, setOpen] = useState(false);

  const [gridApi, setGridApi] = useState(null);

useEffect(async () => {
    await axios
      .get(Location_URL)
      .then((res) => {
        setCountryVal(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(async () => {
    await axios
      .get("http://localhost:5000/events")
      .then((res) => {
        setGetData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [load]);

  const defaultColDef = useMemo(
    () => ({
      headerClass: function (params) {
        return "ag-grid-header";
      },
      resizable: true,
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  const gridOptions = {
    rowStyle: { background: "rgb(228, 232, 239)" },

    getRowStyle: (params) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: "white" };
      }
    },
  };
  // const onGridReady = params => {
  //     setGridApi(params.api)
  // };

  // const onSelectionChanged = () => {
  //     const selectedRows = gridApi.getSelectedRows();
  //     setDescrip(selectedRows[0].description)
  //     setStartDate(selectedRows[0].startdate)
  //     setEndDate(selectedRows[0].enddate)
  //     setSponsor(selectedRows[0].sponsor)
  //     setOrganizer(selectedRows[0].organizer)
  //     setDistrict(selectedRows[0].district)
  //     setState(selectedRows[0].state)
  //     setCountry(selectedRows[0].country)
  //     setOpen(true)
  // }

  function clear() {
    setDescrip("");
    setCountry("");
    setOrganizer("");
    setSponsor("");
    setDistrict("");
    setState("");
    setStartDate(null);
    setEndDate(null);
    setAction("");
  }
  function disable() {
    if (
      descrip !== "" &&
      country !== "" &&
      state !== "" &&
      district !== "" &&
      sponsor !== "" &&
      organizer !== "" &&
      startdate !== "" &&
      enddate !== ""
    ) {
      return false;
    } else {
      return true;
    }
  }
  let start = new Date(startdate);
  let end = new Date(enddate);
  // current
  let cd = curdate.getDate();
  let cm = curdate.getMonth();
  let cy = curdate.getFullYear();
  let cur = `${cy}-${cm + 1}-${cd}`;
  //    start
  let sd = start.getDate();
  let sm = start.getMonth();
  let sy = start.getFullYear();
  let sta = `${sy}-${sm + 1}-${sd}`;
  // end
  let ed = end.getDate();
  let em = end.getMonth();
  let ey = end.getFullYear();
  let en = `${ey}-${em + 1}-${ed}`;

  const handleSubmit = async (e, values) => {
    e.preventDefault();

    let obj = {
      description: descrip,
      country: country,
      state: state,
      district: district,
      sponsor: sponsor,
      organizer: organizer,
      startdate: startdate,
      enddate: enddate,
    };

    console.log(startdate);

    console.log(cur, sta, en);
    console.log(
      +new Date(cur) <= +new Date(sta),
      +new Date(sta) <= +new Date(en)
    );
    console.log(
      "cur",
      new Date(cur),
      "end",
      new Date(en),
      "start",
      new Date(sta)
    );

    if (+new Date(cur) <= +new Date(sta) && +new Date(sta) <= +new Date(en)) {
      if (action === "") {
        await axios
          .post("http://localhost:5000/events", obj)
          .then((res) => Success())
          .catch((err) => console.log(err));
        clear();
      } else {
        await axios
          .put(`http://localhost:5000/events/${action}`, obj)
          .then((res) => Update())
          .catch((err) => console.log(err));
        clear();
      }

      setLoad(!load);
      setOpen(false);
      setErr(false);
    } else {
      setErr(true);
    }
  };

  const getState = async (item) => {
    await axios
      .post(`${Location_URL}/${item}`, countrycode)
      .then((res) => {
        setStateVal(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getCity = async (item) => {
    await axios
      .post(`${Location_URL}/${countrycode}/${item}`, countrycode)
      .then((res) => {
        setCityVal(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpen(false);
    clear();
  };

  const edits = async (item) => {
    // debugger
    setAction(item);
    await axios
      .get(`http://localhost:5000/events/${item}`)
      .then((res) => {
        setDescrip(res.data.description);
        setStartDate(res.data.startdate);
        setEndDate(res.data.enddate);
        setSponsor(res.data.sponsor);
        setOrganizer(res.data.organizer);
        setDistrict(res.data.district);
        setState(res.data.state);
        setCountry(res.data.country);
        setOpen(true);
      })
      .catch((err) => console.log(err));

    // update to location value function
    console.log(getData);

    for (let i = 0; i < getData.length; i++) {
      if (getData[i]._id === item) {
        setCountry(getData[i].country);
        setState(getData[i].state);
        setDistrict(getData[i].district);
        return;
      }
    }
    onchange(item)
    onchangestate(item)
    onchangedistrict(item)
  };

  const filterDataByDate = (item) => {
  let filteredData =getData.filter(data => {
    return data.startdate <= item && data.enddate >= item
  })
  setGetData(filteredData)
  console.log(filteredData)

  };
  const deletes = async (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: false,
      dangerMode: true,
      buttons: ["No", "Yes"],
    }).then(async (response) => {
      if (response) {
        await axios
          .delete(`http://localhost:5000/events/${item}`)
          .then(() => {
            setLoad(!load);
            swal("Your file has been deleted!", {
              icon: "success",
            });
          });
      } else {
        swal("Your file is safe !");
      }
    });
  };

  const onchange = async (e, v) => {
    // debugger
    console.log(e);
    if (v !== undefined) {
      setCountry(v.name);
      setCountrycode(v.code);
      getState(v.code);
    }
  };
  const onchangestate = async (e, v) => {
    // debugger
    console.log(e);
    if (v !== undefined) {
      setState(v.name);
      getCity(v.iso);
    }
  };


  const onchangedistrict = async (e, v) => {
    // debugger
    console.log(e);
    if (v !== undefined) {
      setDistrict(v.name);
    }
  };

  const myStyle = {
    maxHeight: "25px",
    minHeight: "25px",
    minWidth: "25px",
    maxWidth: "25px",
    marginRight: "5px",
  };

  const columns = [
    {
      headerName: "Action",
      field: "_id",
      cellRendererFramework: (params) => (
        <div>
          {new Date(
            `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
              new Date().getDate() - 1
            }`
          ) <=
          new Date(
            `${new Date(params.data.startdate).getFullYear()}-${
              new Date(params.data.startdate).getMonth() + 1
            }-${new Date(params.data.startdate).getDate() - 1}`
          ) ? (
            <div>
              <Fab
                onClick={() => edits(params.value)}
                style={myStyle}
                aria-label="edit"
                title="Edit"
              >
                <EditIcon sx={{ fontSize: 15, color: "grey" }} />
              </Fab>
              <Fab
                onClick={() => deletes(params.value)}
                style={{
                  maxHeight: "25px",
                  minHeight: "25px",
                  minWidth: "25px",
                  maxWidth: "25px",
                }}
                aria-label="edit"
                title="Delete"
              >
                <DeleteOutlineIcon sx={{ fontSize: 15, color: "red" }} />
              </Fab>
            </div>
          ) : null}
        </div>
      ),
    },
    {
      headerName: "Description",
      field: "description",
    },
    {
      headerName: "StartDate",
      field: "startdate",
      cellRenderer: (data) => {
        return moment(data.value).format("DD/MMM/YYYY");
      },
    },
    {
      headerName: "EndDate",
      field: "enddate",
      cellRenderer: (data) => {
        return moment(data.value).format("DD/MMM/YYYY");
      },
    },
    {
      headerName: "Sponsor",
      field: "sponsor",
    },
    {
      headerName: "Organizer",
      field: "organizer",
    },
    {
      headerName: "Country",
      field: "country",
    },
    {
      headerName: "State",
      field: "state",
    },
    {
      headerName: "District",
      field: "district",
    },
    {
      headerName: "Status",
      field: "startdate",
      cellRendererFramework: (params) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "17px",
          }}
        >
          {new Date(
            `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
              new Date().getDate() - 1
            }`
          ) <=
          new Date(
            `${new Date(params.value).getFullYear()}-${
              new Date(params.value).getMonth() + 1
            }-${new Date(params.value).getDate() - 1}`
          ) ? (
            <div
              style={{
                minHeight: "5px",
                maxHeight: "7px",
                maxWidth: "5px",
                minWidth: "5px",
                borderRadius: "7px",
                border: "1px solid green",
                backgroundColor: "green",
              }}
              title="Active"
            ></div>
          ) : (
            <div
              style={{
                minHeight: "5px",
                maxHeight: "7px",
                maxWidth: "5px",
                minWidth: "5px",
                borderRadius: "7px",
                border: "1px solid red",
                backgroundColor: "red",
              }}
              title="InActive"
            ></div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <DialogContent>
          <Typography align="center" variant="h6">
            Event Registration
          </Typography>

          <form
            onSubmit={handleSubmit}
            style={{ border: "1px solid #babfc7", padding: "3%" }}
          >
            <Grid container xs={12} spacing={4}>
              <Grid item container xs={12} spacing={4}>
                <Grid item xs={3}>
                  <DatePicker
                    max={enddate}
                    value={startdate}
                    name="startdate"
                    label="Event start date *"
                    setDate={setStartDate}
                  />
                </Grid>
                <Grid item xs={3}>
                  <DatePicker
                    min={startdate}
                    value={enddate}
                    name="enddate"
                    label="Event end date *"
                    setDate={setEndDate}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    name="organizer"
                    label="Event Organizer *"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={sponsor}
                    onChange={(e) => setSponsor(e.target.value)}
                    name="sponser"
                    label="Event Sponser *"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={4}>
                <Grid item xs={3}>
                  <TextField
                    value={descrip}
                    onChange={(e) => setDescrip(e.target.value)}
                    name="description"
                    label="Description *"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    options={countryVal}
                    getOptionLabel={(opt) => opt.name}
                    inputValue={country}
                    onInputChange={(e, v) => setCountry(v)}
                    onChange={(e, value) => {
                      onchange(e, value);
                    }}
                    filterOptions={filterOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Country *"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    options={stateVal}
                    getOptionLabel={(opt) => opt.name}
                    inputValue={state}
                    onInputChange={(e, v) => setState(v)}
                    onChange={(e, value) => {
                      onchangestate(e, value);
                      // setState(value.name)
                      // getCity(value.iso)
                    }}
                    filterOptions={filterOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="State *"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    options={cityVal}
                    getOptionLabel={(opt) => opt.name}
                    inputValue={district}
                    onInputChange={(e, v) => setDistrict(v)}
                    onChange={(e, value) => {
                      onchangedistrict(e, value);
                    }}
                    filterOptions={filterOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="District *"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              {err && (
                <Grid
                  item
                  container
                  xs={12}
                  direction={"row"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography
                    style={{ color: "red", fontSize: "13px" }}
                    variant="h6"
                  >
                    This date is pasted, so Update new Date
                  </Typography>
                </Grid>
              )}
              <Grid
                item
                container
                xs={12}
                direction={"row"}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <Button type="submit" disabled={disable()} variant="outlined">
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="button"
                    onClick={() => clear()}
                    variant="outlined"
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <div className="ag-theme-alpine" style={{ height: 400, width: "auto" }}>
   
        <AgGridReact
          defaultColDef={defaultColDef}
          rowData={getData}
          columnDefs={columns}
          gridOptions={gridOptions}
        ></AgGridReact>
        <CSVLink data={getData} filename={"shop.csv"}>
          Download CSV
        </CSVLink>
      </div>

      <Box textAlign={"right"} pt={1} pb={1}>
        <Fab onClick={() => setOpen(true)} size="small" color="primary">
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
}
