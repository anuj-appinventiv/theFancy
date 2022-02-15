import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Image1 from '../Images/1.png';
import Image2 from '../Images/image2.jpg';
import Image3 from '../Images/image3.jpg';
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CommitIcon from '@mui/icons-material/Commit';
import { Button } from "@mui/material";
import Drop from "./itemDropdown"
import axios from 'axios';
// const isFavourite = () => (true);
const useStyles = makeStyles(() => ({
  cardContainer: {
    display: "flex",
    flexWrap:"wrap",
    marginTop: "50px",
    width: "100%",
    margin: "10px",
    flexDirection: "row",
  },
  card: {
    width: 395,
    height: 500,
    margin: "10px",
  },
  imgStyle: {
    display: 'block',
    height: '300px',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop:"10px",
    position: 'relative',
    width: "200px"
  },
  secondLine: {
    "&.css-1uwgr7b-MuiTypography-root": {
      fontWeight: "bold",
    }
  },
  btn: {
    float: "left",
    width: "120px",
    "&.css-1rwt2y5-MuiButtonBase-root-MuiButton-root": {
      borderRadius: "20px",
      border: "1px solid black",
      color: "black",
      display: "flex",
      justifyContent: "space-between",
      width: "120px",
      height: "43px"

    },
  },
  top: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    // marginLeft:"30px"
  },
  filter: {
    width: "200px",
    height: "50px",
  },
  container:{
// display:"none",
border:'1px solid black',
  },
  itemContainer:{
    display:"none"
  },
  containerSelected:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
border:"1px solid black",
height:"600px",
width:"100%",
  },
containerSelectedUpper:{
  display:"flex",
  alignItems:"center",
  textAlign:"center",
height:"70px",
width:"85%",
border:"1px solid black",
  },
  containerSelectedLower:{
    display:"flex",
    height:"630px",
    width:"85%",
    border:"1px solid black",
      },
    containerSelectedLowerLeft:{
height:"100%",
width:"15%",
border:"1px solid black",
    },
    containerSelectedLowerMiddle:{
      height:"100%",
width:"40%",
border:"1px solid black",
    },
    containerSelectedLowerRight:{
      height:"100%",
width:"45%",
border:"1px solid black",
    }
}));


export default function BeerCard() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const handleChange = (event: any) => {
    setCategory(event.target.value);
  };

  const classes = useStyles();
  const [over, setOver] = React.useState(false);

  useEffect(() => {
    let apiUrl ="https://fakestoreapi.com/products";
    if(category.length > 0 && category !== 'all'){
      apiUrl = `${apiUrl}/category/${category}`;
    }
  
    axios.get(apiUrl)
      .then((resp) => {
        if (resp.status === 200) {
          console.log("resp is", resp)
          setData(resp.data)
          localStorage.setItem("id", resp.data.id);
          localStorage.setItem("title", resp.data.title);
          localStorage.setItem("price", resp.data.price);
          localStorage.setItem("description", resp.data.description);
          localStorage.setItem("category", resp.data.category);
          localStorage.setItem("image", resp.data.image);
          localStorage.setItem("rating", resp.data.rating);
        }
      })
      .catch((err) => {
        console.log("err is", err)
      })
  }, [category])

  return (
    <div className={classes.container} >
      <div className={classes.itemContainer} >
      <div className={classes.top}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            className={classes.filter}
            value={category}
            label="Filter"
            onChange={handleChange}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"jewelery"}>Jewelery</MenuItem>
            <MenuItem value={"men's clothing"}>Men's Clothing</MenuItem>
            <MenuItem value={"women's clothing"}>Women's Clothing</MenuItem>
            <MenuItem value={"electronics"}>Electrionics</MenuItem>
          </Select>
        </FormControl>
        <Typography align="center" variant="h6">
          52 PRODUCTS
        </Typography>
        <Drop />
      </div>
      <div className={classes.cardContainer}>
        {data.map((item: any) => {
          return (
            <div key={item.id}>
              <Card className={classes.card}>
                <div
                  onMouseOver={() => setOver(true)}
                  onMouseOut={() => setOver(false)}
                >
                  {/* <img
    src={over ? Image1 : Image2}
    alt="arrow"
    className={classes.imgStyle}
  /> */}
                </div>
                <img className={classes.imgStyle} src={item.image} />
                <CardContent>
                  <Typography gutterBottom align="center" component="h2">
                    {item.id}
                  </Typography>
                  <Typography component="p" className={classes.secondLine} align="center">
                    {item.title}
                  </Typography>
                  <Typography gutterBottom align="center" component="h2">
                    {item.price}
                  </Typography>
                  <Typography gutterBottom align="center" component="h2">
                    {item.category}
                  </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
      </div>
      <div className={classes.containerSelected} >
        <div className={classes.containerSelectedUpper} >
         <h5>{"item.category"}</h5>
        </div>
        <div className={classes.containerSelectedLower} >
          <div className={classes.containerSelectedLowerLeft}>
            <h1>test</h1>
          </div>
          <div className={classes.containerSelectedLowerMiddle}>
            <h1>test</h1>
          </div>
          <div className={classes.containerSelectedLowerRight}>
            <h1>test</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

