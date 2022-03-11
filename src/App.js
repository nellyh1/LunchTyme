
import './App.css';
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import TopBar from "./components/AppBar";
import svg from "./images/new.svg";
import restList from "./data/restaurantData.json"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import MapBox from "./components/mapBox";

// global variables for current restaurant selected 
window.restaur = 0;
window.phone = "";
window.twitter = "";

// Style for paper items
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontFamily: `"Montserrat", sans-serif`,
  fontWeight: "bold",
  border: "none",
  fontSize: "1rem"
}))

export default function App() {

  // handles null objects
  // returns a specified value for null objects
  function checkPhone(restaurant) {

    if (restaurant.contact == null) {
      window.phone = "Not Available"
    }
    else if (restaurant.contact.formattedPhone == null) {
      window.phone = "Not Available"
    }
    else {
      window.phone = restaurant.contact.formattedPhone;
    }
  }

  // handles null objects
  // returns a specified value for null objects
  function checkTwitter(restaurant) {
    if (restaurant.contact == null) {
      window.twitter = "Not Available"
    }
    else if (restaurant.contact.twitter == null) {
      window.twitter = "Not Available"
    }
    else {
      window.twitter = restaurant.contact.twitter
    }
  }

  // determines from which side the drawer will appear from
  const [state, setState] = React.useState({
    bottom: false,
  });

  // manages the state of the drawer between open and closed
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open, });
  };


  // when drawer is open the following box will appear as an overlay on the current screen
  const list = (anchor, index) => (
    
    // holds all elements that will appear when drawer is open
    // MapBox displays the google maps frame and manages layout based on screen size
    // the second grid item holds information about the restaurant
    <Box
      className="mapBox"
      sx={{ width: "auto", height: "50vh" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      restaur={restList.restaurants[index]}
    >

    
      <Grid container spacing={5} mt={3} mb={3}>
        <Grid item xs={6} md={6} lg={6} >
          <MapBox lat={restList.restaurants[window.restaur].location.lat} lng={restList.restaurants[window.restaur].location.lng} />
        </Grid>

        <Grid item xs={6} md={6} lg={6} spacing={3}>
          <Typography className="name">{restList.restaurants[window.restaur].name}</Typography>
          <Typography className="address">{restList.restaurants[window.restaur].location.formattedAddress[0]}</Typography>
          <Typography className="address">{restList.restaurants[window.restaur].location.formattedAddress[1]}</Typography>
          <Typography className="address">{restList.restaurants[window.restaur].location.formattedAddress[2]}</Typography>
          <Typography className="phone" {...checkPhone(restList.restaurants[window.restaur])}>{window.phone}</Typography>

          <Grid container mt={10}>
            <Grid item xs={6} md={6}>
              <Typography className="twitter" {...checkTwitter(restList.restaurants[window.restaur])}> @{window.twitter}</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography className="category">{restList.restaurants[window.restaur].category}</Typography>
            </Grid>
          </Grid>

        </Grid>

      </Grid>

    </Box>
  );

  return (

    // app bar is first created on the screen
    // next the banner for the website is displayed
    // a navigation bar of filtering the restaurants is displayed (for display purposes only)
    // container with the restaurant listings is displayed
    <div>
      <TopBar />

      <Grid container pb={8}>
        <Grid item xs={0} md={12} lg={12} >
          <img src={svg} className="banner"></img>
        </Grid>
      </Grid>

      <Container >
        <Grid container pb={5}>
          <Grid item xs={4} md={4}>
            <Item>Popular</Item>
          </Grid>
          <Grid item xs={4} md={4}>
            <Item>Category</Item>
          </Grid>
          <Grid item xs={4} md={4}>
            <Item>Nearby</Item>
          </Grid>
        </Grid>
      </Container>

      <Container className="restaurantList" >
        <Grid container spacing={8} alignItems="center" mt={"3%"}>
          {restList.restaurants.map((rest, index) => (

            ["bottom"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Grid item rest={rest} xs={12} md={6} lg={6} id={index} onClick={toggleDrawer(anchor, true)}>

                  <Paper elevation={8} className="restaurantPaper" rest={rest} index={index} onClick={() => window.restaur = index}>
                    <img src={rest.backgroundImageURL} alt="" className="cardImg" >
                    </img>

                    <Grid container justifyContent="center">
                      <Grid item position="absolute" textAlign="center" my={-18} px={5}>
                        <Typography component="div" variant="h5" className="fontChange">
                          {rest.name}
                        </Typography>

                        <Typography component="div" variant="h5" className="fontChange">
                          {rest.location.city}, {rest.location.state}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Drawer
                  anchor={anchor}
                  index={index}

                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor, index)}
                </Drawer>
              </React.Fragment>
            ))))}
        </Grid>
      </Container>
    </div>
  );
}
