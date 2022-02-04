import { Button, TextField } from "@mui/material";
import { Dialog, Grid,DialogContent ,Avatar ,Typography} from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AgGridReact } from 'ag-grid-react';
import { Box } from "@mui/system";
import {styled} from '@mui/material/styles'
import React, { useState,useMemo,useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Update } from "../../components/alerts/Update";
import { Success } from "../../components/alerts/Success";

function PromoterRegistration(){
    
    const Input=styled('input')({display:'none'})

    const [getData, setGetData] = useState([])
    const [load, setLoad] = useState(true)

    const [baseImage, setBaseImage] = useState("");

    const [name,setName]=useState('')
    const [mail,setMail]=useState('')
    const [aadhar,setAadhar]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')

    const [open,setOpen]=useState(false)
    const [action,setAction]=useState('')

    const [phoneErr,setPhoneErr]=useState(false)

    useEffect(async()=>{
        await axios.get('http://localhost:5000/promoters').then((res)=>{
            setGetData(res.data)
        }).catch((err)=>console.log(err))
    },[load])

    const handleSubmit = async (e, values) => {
        e.preventDefault();

        let obj = {
            name:name,email: mail,aadhar:aadhar,phone: phone ,address:address,photo:baseImage
        }

            if (action === '') {
                await axios.post('http://localhost:5000/promoters', obj)
                    .then((res) => Success()).catch((err) => console.log(err))
                clear()

            } else {
                await axios.put(`http://localhost:5000/promoters/${action}`, obj)
                    .then((res) => Update()).catch((err) => console.log(err))
                clear()
            }

            setLoad(!load)
            setOpen(false)
        }
    


    const edits = async (item) => {
        // debugger
        setAction(item)
        setOpen(true)
        // updaate to location value function

            for(let i=0;i<getData.length;i++){
                if(getData[i]._id===item){
                    setName(getData[i].name)
                    setMail(getData[i].email)
                    setAadhar(getData[i].aadhar)
                    setPhone(getData[i].phone)
                    setAddress(getData[i].address)
                    setBaseImage(getData[i].photo)
                    return
                }
            }
        
    }
    const deletes = async (item) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: 'warning',
            buttons: false,
            dangerMode: true,
            buttons: ['No', 'Yes']
        }).then(async (response) => {
            if (response) {
                await axios.delete(`http://localhost:5000/promoters/${item}`).then(() => {
                    setLoad(!load)
                    swal("Your file has been deleted!", {
                        icon: "success",
                    });
                })
            } else {
                swal('Your file is safe !')
            }
        })
    }
    
    function clear() {
        setName('')
        setMail('')
        setAadhar('')
        setPhone('')
        setAddress('')
        setAction('')
        setBaseImage('')
    }
    function disable() {
        if (name !== '' && mail !== '' && aadhar !== '' && phone !== '' && address !== ''&& baseImage !== '') {
            return false
        } else {
            return true;
        }
    }

    const handleClose = () => {
        setOpen(false)
        clear()
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64)
        setBaseImage(base64);
      };
    
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

      const gridOptions = {
        rowStyle: { background: 'rgb(228, 232, 239)' },
    
        getRowStyle: params => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: 'white' };
            }
        }
    }

    const defaultColDef = useMemo(() => ({
        headerClass: function(params) {
            return 'ag-grid-header'
            },
        resizable: true,
        sortable: true,
        filter: true,
        flex: 1
    }), []);

    const myStyle = {
        maxHeight: "25px",
        minHeight: "25px",
        minWidth: "25px",
        maxWidth: "25px",
        marginRight:"5px"
    };

    const columns = [
        {
            headerName: 'Action', field: "_id", cellRendererFramework: (params) =>
            <div>
                    <Fab onClick={() => edits(params.value)} style={myStyle} aria-label="edit" title="Edit">
                        <EditIcon sx={{ fontSize: 15,color:'grey' }} />
                    </Fab>
                    <Fab onClick={() => deletes(params.value)} style={{ maxHeight: "25px", minHeight: "25px", minWidth: "25px", maxWidth: "25px", }} aria-label="edit" title="Delete">
                        <DeleteOutlineIcon sx={{ fontSize: 15 ,color:'red'}} />
                    </Fab>
            </div>
        },
        {
            headerName: 'Name', field: "name"
        },
        {
            headerName: 'Mail', field: "email"
        },
        {
            headerName: 'Aadhar', field: "aadhar"
        },
        {
            headerName: 'Phone No', field: "phone"
        },
        {
            headerName: 'Address', field: "address"
        }
        
    ]


    function phoneValidation(){
       if(phone.length===10 || phone.length===0){
          return false 
       }else{
          return true
       }
    }
    
    function aadharValidation(){
        if(aadhar.length===12 || aadhar.length===0){
           return false 
        }else{
           return true
        }
     }

    return (
        <div>
            <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
                <DialogContent>
                <Typography align="center" variant="h6">Promoter Details</Typography>
                    <form onSubmit={handleSubmit} style={{border:'1px solid #babfc7',padding:'3%'}}>
                        <Grid container xs={12}>
                            <Grid item  container  xs={3} direction={'row'} justifyContent='center' alignItems='center'>
                                <Grid item container xs={7}  sx={{border:'1px solid #babfc7'}} direction={'column'} justifyContent='center' alignItems='center'>
                                <Grid item mt={1}>
                                    <Avatar sx={{height:120,width:100}} variant='rounded' src={baseImage} alt=""/>
                                </Grid>
                                <Grid item mt={1} mb={1}>
                                    <label htmlFor="contained-button-file">
                                        <Input accept="image/*" type='file' id="contained-button-file" onChange={(e)=>uploadImage(e)} />
                                        <Button size="small" variant="contained" component='span'>Upload</Button>
                                    </label>
                                </Grid>
                                </Grid>
                            </Grid>
                            <Grid item container xs={9} spacing={2}>
                                <Grid item container xs={6}>
                                    <Grid item container xs={12}>
                                        <TextField size="small" variant='outlined' label='Name' name="name" value={name} onChange={(e)=>{setName(e.target.value)}} />
                                    </Grid>
                                    <Grid item container xs={12}>
                                        <TextField size="small" type='email' title="please fill valid mail id" variant='outlined' label='E-mail' name="mail" value={mail} onChange={(e)=>{setMail(e.target.value)}} />
                                    </Grid>
                                </Grid>
                                <Grid item container xs={6}>
                                    <Grid item container xs={12}>
                                            <TextField inputProps={{maxLength:12,minLength:12}} error={aadharValidation()} helperText={aadharValidation()?'Enter Valid 12 Degit Number':null} size="small" variant='outlined' label='Aadhar' name="aadhar" value={aadhar} onChange={(e)=>{setAadhar(e.target.value.replace(/[^0-9]/g, ''))}} />
                                    </Grid>
                                    <Grid item container xs={12}>
                                            <TextField inputProps={{maxLength:10,minLength:10}} error={phoneValidation()} helperText={phoneValidation()?'Enter Valid Phone Number':null} size="small" variant='outlined' label='Phone Number' name='phone' value={phone} onChange={(e)=>setPhone(e.target.value.replace(/[^0-9]/g, ''))}/>
                                    </Grid>
                                </Grid>
                                    <Grid item container xs={6}>
                                        <Grid item >
                                        <TextField size="small" variant='outlined' label='Address' name='address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
                                        </Grid>
                                    </Grid>
                                   <Grid item container xs={6} spacing={2}>
                                        <Grid item >
                                            <Button disabled={disable()} type="submit" variant="outlined">Submit</Button>
                                        </Grid>
                                        <Grid item >
                                            <Button onClick={() => clear()} type="button"  variant="outlined">Clear</Button>
                                        </Grid>
                                    </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
            <div className="ag-theme-alpine" style={{ height: 400, width: 'auto' }}>
                <AgGridReact
                    defaultColDef={defaultColDef}
                    rowData={getData}
                    columnDefs={columns}
                    gridOptions={gridOptions}
                >
                </AgGridReact>
            </div>
            <Box textAlign={'right'} pt={1} pb={1}>
                <Fab onClick={() => setOpen(true)} size="small" color="primary">
                    <AddIcon />
                </Fab>
            </Box>
        </div>
    )
}

export default PromoterRegistration


