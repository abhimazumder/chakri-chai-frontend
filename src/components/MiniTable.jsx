/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const styles = {
  tableHeader: {
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    height: 35,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tableCellHeaderLeft: {
    borderBottom: "none",
    borderRadius: "1em 0 0 1em",
  },
  tableCell: {
    borderBottom: "none",
  },
  tableCellHeaderRight: {
    borderBottom: "none",
    borderRadius: "0 1em 1em 0",
  },
  tableHeaderTypography: {
    fontWeight: "bold",
    fontFamily: "Montserrat, sans-serif",
    color: "#FFFFFF",
    fontSize: 14,
  },
  tableTypography: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 13,
  },
  cellData: {
    fontWeight: "bold",
    fontFamily: "Montserrat, sans-serif",
    fontSize: 13,
  },
  booleanYes: {
    color: "#2F9931",
    fontWeight: "bold",
    fontFamily: "Montserrat, sans-serif",
    fontSize: 13,
  },
  booleanNo: {
    color: "#E03131",
    fontWeight: "bold",
    fontFamily: "Montserrat, sans-serif",
    fontSize: 13,
  },
};

const MiniTable = ({ headerNames, rows }) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  const handleRowClick = (rowId) => {
    console.log("Clicked on", rowId);
  }

  return (
    <Table>
      <TableHead>
        <TableRow style={styles.tableHeader}>
          {headerNames.map((headerName, index) => (
            <TableCell
              align="center"
              style={
                index === 0
                  ? styles.tableCellHeaderLeft
                  : index === headerNames.length - 1
                  ? styles.tableCellHeaderRight
                  : styles.tableCell
              }
              key={headerName.HEADER_ID}
            >
              <Typography style={styles.tableHeaderTypography}>
                {headerName.HEADER_LABEL}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(rows).map(([rowId, rowData], index) => (
          <TableRow
            key={rowId}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            sx={
              index === hoveredRowIndex
                ? {
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }
                : null
            }
          >
            {Object.values(rowData).map((data, dataIndex) => (
              <TableCell
                align="center"
                style={
                  dataIndex === 0
                    ? styles.tableCellHeaderLeft
                    : dataIndex === Object.values(rowData).length - 1
                    ? styles.tableCellHeaderRight
                    : styles.tableCell
                }
                key={`${index}-${dataIndex}`}
              >
                {typeof data === "boolean" ? (
                  data ? (
                    <Typography style={styles.booleanYes}>Yes</Typography>
                  ) : (
                    <Typography style={styles.booleanNo}>No</Typography>
                  )
                ) : (
                  <Typography style={styles.cellData}>{data}</Typography>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MiniTable;
