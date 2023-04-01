import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import deepPurple from "@mui/material/colors/deepPurple";
import { createMakeAndWithStyles } from 'tss-react';

export const { makeStyles, withStyles } = createMakeAndWithStyles({
  useTheme,
});

const MessageRow = styled(Box)(({ theme }) => ({
  display: "flex"
}));
const MessageRowRight = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end"
}));
const MessageBlue = styled(Box)(({ theme }) => ({
  position: "relative",
  marginLeft: 20,
  marginBottom: 10,
  padding: 10,
  backgroundColor: "#FFF",
  width: "60%",
  //height: "50px",
  textAlign: "left",
  font: "400 .9em 'Open Sans', sans-serif",
  border: "1px solid #FFF",
  borderRadius: "10px",
  "&:after": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "15px solid #FFF",
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    top: "0",
    left: "-15px"
  },
  "&:before": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "17px solid #FFF",
    borderLeft: "16px solid transparent",
    borderRight: "16px solid transparent",
    top: "-1px",
    left: "-17px"
  }
}));
const MessageOrange = styled(Box)(({ theme }) => ({
  position: "relative",
  marginRight: 20,
  marginBottom: 10,
  padding: 10,
  backgroundColor: "#DCF8C7",
  width: "60%",
  //height: "50px",
  textAlign: "left",
  font: "400 .9em 'Open Sans', sans-serif",
  border: "1px solid #DCF8C7",
  borderRadius: "10px",
  "&:after": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "15px solid #DCF8C7",
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    top: "0",
    right: "-15px"
  },
  "&:before": {
    content: "''",
    position: "absolute",
    width: "0",
    height: "0",
    borderTop: "17px solid #DCF8C7",
    borderLeft: "16px solid transparent",
    borderRight: "16px solid transparent",
    top: "-1px",
    right: "-17px"
  }
}));
const MessageContent = styled(Typography)(({ theme }) => ({
  padding: 0,
  margin: 0
}));
const MessageTimeStampRight = styled(Box)(({ theme }) => ({
  position: "absolute",
  fontSize: ".75em",
  fontWeight: "300",
  marginTop: 10,
  bottom: 3,
  right: 5,
}));
const DisplayName = styled(Typography)(({ theme }) => ({
  marginLeft: "20px"
}));

const useStyles = makeStyles()((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepPurple[200]),
    backgroundColor: deepPurple[200],
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
}));
export const MessageLeft = (props: any) => {
  const { message = "no message", timestamp = "", photoURL = "dummy.js", displayName = "test" } = props;
  const classes = useStyles().classes;
  return (
    <MessageRow>
      <Avatar
        alt={displayName}
        className={classes.orange}
        src={photoURL}
      ></Avatar>
      <Box>
        <DisplayName variant="overline">{displayName}</DisplayName>
        <MessageBlue>
          <Box>
            <MessageContent variant="body2">{message}</MessageContent>
          </Box>
          <MessageTimeStampRight>{timestamp}</MessageTimeStampRight>
        </MessageBlue>
      </Box>
    </MessageRow>
  );
};
export const MessageRight = (props: any) => {
  const { message = "no message", timestamp = "" } = props;
  return (
    <MessageRowRight>
      <MessageOrange>
        <MessageContent variant="body2">{message}</MessageContent>
        <MessageTimeStampRight>{timestamp}</MessageTimeStampRight>
      </MessageOrange>
    </MessageRowRight>
  );
};
