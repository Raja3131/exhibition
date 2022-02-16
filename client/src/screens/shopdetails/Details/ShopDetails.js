import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';
import {Paper, Typography, CircularProgress, Divider} from '@mui/material'


const ShopDetails = () => {
    const [shopData, setShopData] = useState([]);


    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/shopdetails/${id}`).then((res) => {
            const data = res.data;
            setShopData(data);
        });
    }, [id]);

    if (shopData.length === 0) {
        return <div>Loading...</div>;

    }





return (<>

    <Paper  className="paper">
        <div className="shop-details">
            <div className="shop-details-image">
                <img src={shopData.shopImage} alt="shop" className="img-fluid" />
            </div>
            <div className="shop-details-info">
                <Typography variant="h5">{shopData.shopName}</Typography>
                <Typography variant="subtitle1">{shopData.shopAddress}</Typography>
                <Typography variant="subtitle1">{shopData.description}</Typography>
                <Typography variant="subtitle1">{shopData.shopRating}</Typography>
            </div>
        </div>
    </Paper>
    <Divider />
    
</>);




}
export default ShopDetails