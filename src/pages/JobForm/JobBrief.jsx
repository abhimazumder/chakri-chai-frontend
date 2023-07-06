import { Container, Grid, Paper, Typography } from '@mui/material';

const SampleJob = {
    JOB_ID: '650112',
    JOB_TITLE: 'Software Engineer - Entry Level',
    JOB_LOCATION: 'Pune, India',
    JOB_DESCRIPTION: '',
    JOB_POSTING_DATE: '12/10/22',
    LAST_DATE_TO_APPLY: '20/10/22'
};

const JobBrief = () => {
    const styles = {
        slantedText: {
            transform: 'skew(-10deg)',
            marginLeft: 'auto'
        },
        asterisk: {
            color: 'red',
            marginRight: '2px',
        },
        roundedPaper: {
            padding: 2,
            borderRadius: 3,
          },
    };


    return (
        <Container>
            <Paper elevation={3} sx={styles.roundedPaper}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {SampleJob.JOB_TITLE}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                        <Typography sx={styles.slantedText}>
                            Job ID: {SampleJob.JOB_ID}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Location: {SampleJob.JOB_LOCATION}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography>
                            Posted on: {SampleJob.JOB_POSTING_DATE}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                        <Typography>
                        <span style={styles.asterisk}>*</span>Last date to apply: {SampleJob.LAST_DATE_TO_APPLY}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default JobBrief;
