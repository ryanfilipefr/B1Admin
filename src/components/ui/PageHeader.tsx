import React, { type ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { HeaderToneContext } from "./headerTone";
import { useThemeMode } from "../../ThemeContext";

export interface PageHeaderProps {
  icon?: ReactNode;
  avatar?: ReactNode;
  title: string;
  subtitle?: ReactNode;
  breadcrumbs?: ReactNode;
  chips?: ReactNode;
  children?: ReactNode;
  statistics?: Array<{ icon?: ReactNode; value: ReactNode; label: string }>;
  tabs?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const banner = useThemeMode().themeId === "classic";
  const header = <PageHeaderContent {...props} banner={banner} />;
  return banner ? <Box className="b1-banner">{header}</Box> : header;
};

const PageHeaderContent: React.FC<PageHeaderProps & { banner: boolean }> = ({ icon, avatar, title, subtitle, breadcrumbs, chips, children, statistics, tabs, banner }) => (
  <HeaderToneContext.Provider value={banner ? "dark" : "light"}>
    <Box
      id="page-header"
      component="header"
      sx={{
        maxWidth: "var(--b1-content-max)",
        mx: "auto",
        px: { xs: 2, md: 3, lg: 4 },
        pt: { xs: 2.5, md: 3.5 },
        pb: { xs: 2, md: 2.5 }
      }}
    >
      {breadcrumbs && <Box id="page-header-breadcrumbs" sx={{ mb: 1.5 }}>{breadcrumbs}</Box>}

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2, md: 3 }}
        alignItems={{ xs: "stretch", md: "flex-start" }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
          {avatar && <Box id="page-header-avatar" sx={{ flexShrink: 0, display: "flex" }}>{avatar}</Box>}
          {!avatar && banner && icon && <Box className="b1-banner-icon">{icon}</Box>}
          <Box id="page-header-text" sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" useFlexGap flexWrap="wrap">
              <Typography id="page-header-title" variant="h1" component="h1" sx={{ overflowWrap: "anywhere" }}>{title}</Typography>
              {chips && <Stack id="page-header-chips" direction="row" spacing={1} alignItems="center">{chips}</Stack>}
            </Stack>
            {subtitle && (
              <Typography id="page-header-subtitle" color="text.secondary" sx={{ mt: 0.75, maxWidth: 820 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Stack>

        {children && (
          <Stack
            id="page-header-actions"
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            alignItems="center"
            sx={{ flexShrink: 0, justifyContent: { xs: "flex-start", md: "flex-end" } }}
          >
            {children}
          </Stack>
        )}
      </Stack>

      {statistics && statistics.length > 0 && (
        <Stack id="page-header-statistics" direction="row" useFlexGap flexWrap="wrap" sx={{ mt: 2.5, gap: 1.25 }}>
          {statistics.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                minWidth: 132,
                px: 1.75,
                py: 1.25,
                borderRadius: 2,
                bgcolor: "var(--b1-selected)",
                color: "var(--b1-on-selected)"
              }}
            >
              <Typography sx={{ fontSize: 18, lineHeight: "25px", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{stat.value}</Typography>
              <Typography variant="caption" sx={{ color: "inherit", opacity: 0.78 }}>{stat.label}</Typography>
            </Box>
          ))}
        </Stack>
      )}

      {tabs && <Box id="page-header-tabs" sx={{ mt: 2.5 }}>{tabs}</Box>}
    </Box>
  </HeaderToneContext.Provider>
);
