import React, { type ReactNode } from "react";
import { Box } from "@mui/material";

interface AuthShellProps {
  logoAlt: string;
  children: ReactNode;
}

export const AuthShell: React.FC<AuthShellProps> = ({ logoAlt, children }) => (
  <Box sx={{ display: "flex", backgroundColor: "background.default", minHeight: "100vh" }}>
    <div style={{ width: "100%", maxWidth: 500, marginLeft: "auto", marginRight: "auto", padding: "20px 16px" }}>
      <Box
        sx={{
          width: "100%",
          minHeight: 100,
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "var(--b1-radius-panel)",
          padding: "10px"
        }}
        px="16px"
        mx="auto">
        <div style={{ textAlign: "center", margin: "32px 16px" }}>
          <img src="/images/hubpastoral-logo.svg" alt={logoAlt} style={{ maxWidth: "100%", maxHeight: 80 }} />
        </div>
        {children}
      </Box>
    </div>
  </Box>
);
