import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TextField, Button, Typography,ButtonBase } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from "axios";
import FileBase from "react-file-base64";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [description, setDescription] = useState("");
  const [shopImage, setShopImage] = useState("");
  const [shopRating, setShopRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [shopId, setShopId] = useState("");

  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/shopdetails").then((res) => {
      console.log(res.data);
      setShopData([...res.data]);
    });
  }, []);


        


  const handleSubmit = (e) => {
    e.preventDefault();
    // const newShop = {
    //   shopName,
    //   shopAddress,
    //   description,
    //   shopImage,
    //   shopRating,
    // };
    // const result = axios
    //   .post("http://localhost:5000/shopdetails", newShop)
    //   .then((res) => {
    //     console.log(res.data);
    //     setShopData([...shopData, res.data]);
    //     clear()
    //   })
    //   .catch((err) => console.log(err));
    if(shopId){
      axios.put(`http://localhost:5000/shopdetails/${shopId}`, {
        shopName,
        shopAddress,
        description,
        shopRating,
        shopImage,

      }).then((res) => {
        console.log(res.data);
        if(res.data.nModified === 1){
          setShopData([{
            shopName,
            shopAddress,
            description,
            shopRating,
            shopImage,
            
          }]);
          

        clear()

        }

          
        

      })

      .catch((err) => console.log(err));
    }else{
      axios.post("http://localhost:5000/shopdetails", {
        shopName,
        shopAddress,
        description,
        shopRating,
        shopImage,

      }).then((res) => {
        console.log(res.data);
        setShopData([...shopData, res.data]);
        clear()
      })
      .catch((err) => console.log(err));
    }
  };

  const clear = () => {
    setShopName("");
    setShopAddress("");
    setDescription("");
    setShopImage("");
    setShopRating("");
  };

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:5000/shopdetails/${_id}`)
      .then((res) => {
        console.log(res.data);
        setShopData(shopData.filter((shop) => shop._id !== _id));
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (shop,id) => {

    setShopName(shop.shopName);
    setShopAddress(shop.shopAddress);
    setDescription(shop.description);
    setShopImage(shop.shopImage);
    setShopRating(shop.shopRating);
    setShopId(id);

  }
  const openShop = (shop) => {
    navigate(`/details/${shop._id}`);
  }
  return (
    <>
      <form>
        <Typography variant="h6" gutterBottom>
          Creating Shop
        </Typography>
        <TextField
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          label="Shop Name"
        />
        <TextField
          value={shopAddress}
          onChange={(e) => setShopAddress(e.target.value)}
          label="Shop Address"
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
        />
        <TextField
          value={shopRating}
          onChange={(e) => setShopRating(e.target.value)}
          label="Shop Rating"
        />

        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setShopImage(base64)}
        />

        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={clear}>Clear</Button>
      </form>

      <Grid container spacing={3}>
        {shopData.map((shop) => (
          <Grid item xs={12} sm={6} md={4}>
            <CardContent>
             <ButtonBase
              onClick={() => openShop(shop)} 
             
             >
              <CardMedia
                component="img"
                alt="Shop Image"
                height="200"
                width="140"                
                image={shop.shopImage}
                title="Shop Image"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {shop.shopName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {shop.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {shop.shopAddress}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {shop.shopRating}
                </Typography>
              </CardContent>
              <CardActions>
              
                <Button
                  onClick={() => handleDelete(shop._id)}
                  size="small"
                  color="primary"
                >
                  <DeleteIcon />
                </Button>
                <Button
                  onClick={() => handleEdit(shop,shop._id)}
                  size="small"
                  color="primary"
                >
                  <MoreHorizIcon />
                </Button>

              </CardActions>
              </ButtonBase>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Form;
