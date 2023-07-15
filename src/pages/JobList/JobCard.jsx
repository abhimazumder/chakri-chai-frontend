/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Container, Grid, Paper } from '@mui/material';

const MyComponent = () => {
  const styles = {
    roundedPaper: {
      padding: '16px',
      borderRadius: 6,
    },
    gridItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    applyButton: {
      backgroundColor: '#ED1C24',
      borderRadius: 50,
      width: 120,
      height: 40,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.50)',
      margin: 3,
    },
    shareButton: {
      backgroundColor: '#2F4F4F',
      borderRadius: 50,
      width: 120,
      height: 40,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.50)',
      margin: 3,
    },
  };

  return (
    <Container>
      <Paper elevation={3} style={styles.roundedPaper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} style={styles.gridItem}>
            <Button>
              Click
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={styles.gridItem}>
            <Button>
              Click
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={styles.gridItem}>
            <Button>
              Click
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2} style={styles.gridItem}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={styles.shareButton}
                  type="submit"
                >
                  Share
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={styles.applyButton}
                  type="submit"
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MyComponent;
