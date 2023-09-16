/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";

import "@fontsource/montserrat";

const styles = {
  timelineOppositeContentBox: { 
    marginTop: 10,
    color: "grey"
  },
  timelineDot: {
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
  },
  timelineContent: {
    marginTop: 5,
    marginBottom: 20,
    width: "330px",
    borderRadius: 10,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, .5)",
  },
  boxPadding: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getUTCDate() || "--"}/${date.getUTCMonth() + 1 || "--"}/${
    date.getUTCFullYear() || "----"
  }`;
};

const EducationExpereinceDisplay = ({ EDUCATION, EXPEREINCE }) => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const setupTimeline = () => {
      const education = Object.entries(EDUCATION).map(([eduKey, eduObj]) => {
        eduObj.OBJECT_ID = eduKey;
        return eduObj;
      });
      const experience = Object.entries(EXPEREINCE).map(([expKey, expObj]) => {
        expObj.OBJECT_ID = expKey;
        return expObj;
      });
      const unsortedTimeline = [...education, ...experience];
      const sortedTimeline = unsortedTimeline.sort((a, b) => {
        let date1 = "";
        let date2 = "";
        if (a["From"]) date1 = a["From"];
        else date1 = a["Start Date"];

        if (b["From"]) date2 = b["From"];
        else date2 = b["Start Date"];

        return new Date(date1) - new Date(date2);
      });
      setTimeline(sortedTimeline);
    };

    setupTimeline();
  }, [EDUCATION, EXPEREINCE]);
  return (
    <Timeline align="left">
      {timeline.map((object, index) => (
        <TimelineItem key={object.OBJECT_ID}>
          <TimelineOppositeContent>
            <Box style={styles.timelineOppositeContentBox}>
              {object.OBJECT_ID.split("-")[0] === "Education" ? (
                <Typography
                  variant="body2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {`${formatDate(object["From"])} - ${formatDate(
                    object["To"]
                  )}`}
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {`${formatDate(object["Start Date"])} - ${
                    object["Current Job"]
                      ? "Present"
                      : formatDate(object["End Date"])
                  }`}
                </Typography>
              )}
            </Box>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot style={styles.timelineDot}>
              {object.OBJECT_ID.split("-")[0] === "Education" ? (
                <SchoolRoundedIcon />
              ) : (
                <WorkRoundedIcon />
              )}
            </TimelineDot>
            {timeline.length - 1 !== index && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Box
              style={{
                ...styles.timelineContent,
                height:
                  object.OBJECT_ID.split("-")[0] === "Education"
                    ? "110px"
                    : "60px",
              }}
            >
              <Grid container style={styles.boxPadding}>
                {object.OBJECT_ID.split("-")[0] === "Education" ? (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {object["Degree"]}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 5 }}>
                      <Typography
                        variant="body2"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "normal",
                          fontSize: "10px",
                        }}
                      >
                        {object["Specialization"]}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 5 }}>
                      <Typography
                        variant="body2"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "normal",
                          fontSize: "12px",
                        }}
                      >
                        {object["College/University"]}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        marginTop: 5,
                        display: "flex",
                      }}
                    >
                      <Typography
                        variant="body2"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "normal",
                          fontSize: "12px",
                          marginRight: 5,
                        }}
                      >
                        {"CGPA/Percentage :"}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {object["CGPA/Percentage"]}
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {object["Job Title/Role"]}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "normal",
                          fontSize: "14px",
                        }}
                      >
                        {object["Company Name"]}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default EducationExpereinceDisplay;
