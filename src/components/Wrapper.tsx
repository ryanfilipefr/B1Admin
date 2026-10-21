import React from "react";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { DocChatWidget } from "./docChat";
import { BezChatWidget } from "./bezChat";
import { SuperBeeChatWidget } from "./superBeeChat";

interface Props {
  pageTitle?: string;
  children: React.ReactNode;
}

export const Wrapper: React.FC<Props> = (props) => {
  const params = new URLSearchParams(window.location.search);
  const showHeader = params.get("hideHeader") !== "true";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: "fixed",
          top: 8,
          left: 8,
          zIndex: 9999,
          px: 2,
          py: 1,
          borderRadius: 1.5,
          bgcolor: "background.paper",
          color: "text.primary",
          border: 1,
          borderColor: "divider",
          transform: "translateY(-160%)",
          "&:focus": { transform: "translateY(0)" }
        }}
      >
        Pular para o conteúdo
      </Box>

      {showHeader && <Header />}

      <Box
        id="main-content"
        component="main"
        tabIndex={-1}
        sx={{
          width: "100%",
          minHeight: showHeader ? "calc(100vh - 68px)" : "100vh",
          outline: "none"
        }}
      >
        {showHeader && <div id="appBarSpacer" />}
        {props.children}
      </Box>

      {showHeader && (
        process.env.REACT_APP_CHAT_MODE === "superbee" ? <SuperBeeChatWidget />
          : process.env.REACT_APP_CHAT_MODE === "bez" ? <BezChatWidget />
            : process.env.REACT_APP_CHAT_MODE === "standard" ? <DocChatWidget />
              : null
      )}
    </Box>
  );
};
