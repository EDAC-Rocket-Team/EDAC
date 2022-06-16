import React from "react";
import { Typography, Link } from "@mui/material";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ position: "relative", mt: 4, mb: 0.5, width: "100%", textAlign: "center" }}
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" underline="none">
        EDAC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}