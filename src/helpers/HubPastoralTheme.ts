import { createTheme, type PaletteMode } from "@mui/material";
import { createAppTheme, type ThemeId } from "./Themes";

const light = {
  canvas: "#F6F7F5",
  surface: "#FFFFFF",
  surfaceAlt: "#F0F4F1",
  primary: "#163A46",
  primaryHover: "#245563",
  primarySoft: "#E6F0F1",
  primarySoftText: "#163A46",
  sage: "#6F8F7C",
  sageSoft: "#E9F0EB",
  gold: "#B28A4A",
  goldSoft: "#F4ECDD",
  text: "#1E2B30",
  muted: "#66777D",
  border: "#DCE3E0",
  danger: "#A84646",
  dangerSoft: "#F7E9E8"
};

const dark = {
  canvas: "#0F1719",
  surface: "#162126",
  surfaceAlt: "#1B292E",
  primary: "#9CC0C9",
  primaryHover: "#B7D1D7",
  primarySoft: "#20343A",
  primarySoftText: "#D9EAED",
  sage: "#A8BDAE",
  sageSoft: "#213128",
  gold: "#D3B37A",
  goldSoft: "#382F20",
  text: "#EEF3F1",
  muted: "#A9B6B2",
  border: "#2E3C40",
  danger: "#E39891",
  dangerSoft: "#3B2423"
};

export const createHubPastoralTheme = (mode: PaletteMode, themeId: ThemeId, brandColor: string) => {
  const base = createAppTheme(mode, themeId, brandColor);
  const c = mode === "dark" ? dark : light;

  return createTheme(base, {
    palette: {
      mode,
      primary: { main: c.primary, dark: mode === "dark" ? "#82AAB5" : c.primaryHover, contrastText: mode === "dark" ? "#102126" : "#FFFFFF" },
      secondary: { main: c.gold, contrastText: mode === "dark" ? "#201A10" : "#FFFFFF" },
      success: { main: c.sage },
      error: { main: c.danger },
      background: { default: c.canvas, paper: c.surface },
      text: { primary: c.text, secondary: c.muted },
      divider: c.border
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: { fontSize: "2rem", lineHeight: 1.18, fontWeight: 720, letterSpacing: "-0.035em" },
      h2: { fontSize: "1.5rem", lineHeight: 1.25, fontWeight: 700, letterSpacing: "-0.025em" },
      h3: { fontSize: "1.125rem", lineHeight: 1.35, fontWeight: 680 },
      h4: { fontSize: "1.05rem", lineHeight: 1.4, fontWeight: 680 },
      h5: { fontSize: "1rem", lineHeight: 1.45, fontWeight: 680 },
      h6: { fontSize: "0.95rem", lineHeight: 1.45, fontWeight: 680 },
      body1: { fontSize: "0.95rem", lineHeight: 1.6 },
      body2: { fontSize: "0.875rem", lineHeight: 1.55 },
      button: { textTransform: "none", fontWeight: 650 }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root:root, body.dark-theme.dark-theme": {
            "--b1-canvas": c.canvas,
            "--b1-surface": c.surface,
            "--b1-sidebar": c.surfaceAlt,
            "--b1-header": "#163A46",
            "--b1-header-hover": "#245563",
            "--b1-on-header": "#FFFFFF",
            "--b1-header-muted": "#D7E4E6",
            "--b1-primary": c.primary,
            "--b1-primary-hover": c.primaryHover,
            "--b1-primary-pressed": mode === "dark" ? "#C5DADE" : "#0E2C35",
            "--b1-on-primary": mode === "dark" ? "#102126" : "#FFFFFF",
            "--b1-selected": c.primarySoft,
            "--b1-on-selected": c.primarySoftText,
            "--b1-hover": mode === "dark" ? "#213137" : "#F1F5F3",
            "--b1-text": c.text,
            "--b1-muted": c.muted,
            "--b1-border": c.border,
            "--b1-control-border": mode === "dark" ? "#5F7075" : "#9CAAA6",
            "--b1-focus": c.gold,
            "--b1-success": c.sage,
            "--b1-success-bg": c.sageSoft,
            "--b1-warning": c.gold,
            "--b1-warning-bg": c.goldSoft,
            "--b1-danger": c.danger,
            "--b1-danger-bg": c.dangerSoft,
            "--b1-neutral": c.muted,
            "--b1-neutral-bg": c.surfaceAlt,
            "--b1-link": mode === "dark" ? "#BBD8DE" : "#245563",
            "--b1-accent": c.gold,
            "--b1-accent-bg": c.goldSoft,
            "--b1-avatar": c.sage,
            "--b1-chip": c.primarySoft,
            "--b1-on-chip": c.primarySoftText,
            "--b1-chip-alt": c.goldSoft,
            "--b1-on-chip-alt": c.gold,
            "--b1-eyebrow": c.sage,
            "--b1-pill-bg": c.primarySoft,
            "--b1-pill-fg": c.primarySoftText,
            "--b1-radius-control": "10px",
            "--b1-radius-panel": "14px",
            "--b1-shadow-popover": "0 18px 42px rgba(22, 58, 70, 0.16)",
            "--bg-main": c.canvas,
            "--bg-card": c.surface,
            "--text-main": c.text,
            "--text-muted": c.muted,
            "--border-main": c.border,
            "--border-light": c.border,
            "--link": mode === "dark" ? "#BBD8DE" : "#245563",
            "--c1": c.primary,
            "--c1d5": "#163A46"
          },
          body: { backgroundColor: c.canvas, color: c.text },
          "#site-header": {
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 28px rgba(22, 58, 70, 0.08)"
          },
          "#site-toolbar": {
            minHeight: "68px",
            backgroundColor: "#163A46 !important"
          },
          "#appBarSpacer": { height: "68px !important" },
          ".b1-surface": {
            borderRadius: "14px !important",
            borderColor: `${c.border} !important`,
            boxShadow: mode === "dark" ? "none" : "0 10px 30px rgba(22, 58, 70, 0.045)"
          },
          ".b1-banner": {
            background: "transparent !important",
            color: `${c.text} !important`,
            paddingBottom: "10px !important"
          },
          ".b1-banner #page-header-title": { color: `${c.text} !important` },
          ".b1-banner #page-header-subtitle": { color: `${c.muted} !important` },
          "#page-header": { paddingTop: "18px", paddingBottom: "18px" },
          "#page-header-title": { letterSpacing: "-0.025em" },
          ".MuiTableRow-root": { borderRadius: "10px" },
          ".MuiTableRow-root:hover": { backgroundColor: mode === "dark" ? "#1D2B30" : "#F5F8F6" },
          ".MuiDrawer-paper": { backgroundColor: `${c.surfaceAlt} !important`, borderRight: `1px solid ${c.border} !important` },
          ".MuiMenu-paper, .MuiPopover-paper": { border: `1px solid ${c.border}`, boxShadow: "0 18px 42px rgba(22, 58, 70, 0.14)" },
          ".MuiAlert-root": { borderRadius: 12 },
          ".MuiChip-root": { borderRadius: 999 },
          "::selection": { backgroundColor: c.goldSoft, color: c.text }
        }
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 10, minHeight: 42, paddingInline: 16 },
          containedPrimary: { boxShadow: "none", "&:hover": { boxShadow: "0 8px 20px rgba(22, 58, 70, 0.16)" } },
          outlined: { borderColor: c.border, backgroundColor: c.surface }
        }
      },
      MuiCard: { styleOverrides: { root: { borderRadius: 14, border: `1px solid ${c.border}`, boxShadow: mode === "dark" ? "none" : "0 10px 30px rgba(22, 58, 70, 0.045)" } } },
      MuiPaper: { styleOverrides: { rounded: { borderRadius: 14 } } },
      MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 10, backgroundColor: c.surface } } },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            marginInline: 6,
            "&.Mui-selected, &.Mui-selected:hover": { backgroundColor: c.primarySoft, color: c.primarySoftText }
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          head: { color: c.muted, fontWeight: 700, backgroundColor: c.surfaceAlt, borderBottom: `1px solid ${c.border}` },
          body: { borderBottom: `1px solid ${c.border}` }
        }
      }
    }
  });
};
