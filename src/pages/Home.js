import React from 'react';
import { Grid } from '@material-ui/core';
import Page from '../components/Page';
import company from "../utils/company.jpg" 

const Home = () => {

  return (
    <Page>
      <Grid
        container
        justify="center"
        style={{
          height: '85vh',
          backgroundImage: `url(${company})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
          <div style={{ marginTop: 20, padding: 30, fontSize:"5vh"} }>
            <Grid container spacing={10} justify="center" >
              <h1>Welcome to WAYVZ</h1>
            </Grid>
          </div>
      </Grid>
    </Page>
  );
}

export default Home;
