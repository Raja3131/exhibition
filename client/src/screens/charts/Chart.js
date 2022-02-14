import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect,useState } from 'react';
import axios from 'axios';


const Chart = () => {
    const [shopData, setShopData] = useState([]);

    
  useEffect(() => {
    axios.get("http://localhost:5000/shopdetails").then((res) => {
      console.log(res.data);
      setShopData([...res.data]);
    });
  }, []);


  const data = shopData.map(item => {
    return {
      name: item.shopName,
      uv: item.shopRating,
      pv: item.shopRating,
      amt: item.shopRating,
    }
  })
  return (
      <>
      <h1>Charts</h1>

        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

  

      </>
  )
}

export default Chart