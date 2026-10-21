import React, { type ReactNode } from "react";
import { Box, Stack, Typography, TableCell } from "@mui/material";
import { InRecordContext } from "./RecordLayout";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: "table" | "card" | "plain";
  colSpan?: number;
}

const EmptyIcon = ({ icon }: { icon?: ReactNode }) => {
  if (!React.isValidElement(icon)) return null;
  return (
    <Box
      sx={{
        width: 42,
        height: 42,
        display: "grid",
        placeItems: "center",
        borderRadius: 2.25,
        bgcolor: "var(--b1-selected)",
        color: "var(--b1-on-selected)",
        flexShrink: 0,
        "& .MuiSvgIcon-root": { fontSize: 21 }
      }}
      aria-hidden="true"
    >
      {icon}
    </Box>
  );
};

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, variant = "card", colSpan = 5 }) => {
  const inRecord = React.useContext(InRecordContext);

  if ((inRecord && variant !== "table") || variant === "plain") {
    return (
      <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ py: 1 }}>
        <EmptyIcon icon={icon} />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body1" sx={{ fontWeight: 650, color: "text.primary" }}>{title}</Typography>
          {description && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.35, maxWidth: 560 }}>{description}</Typography>}
          {action && <Box sx={{ mt: 1.25 }}>{action}</Box>}
        </Box>
      </Stack>
    );
  }

  if (variant === "table") {
    return (
      <TableCell colSpan={colSpan} sx={{ py: 3.5, borderBottom: 0 }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <EmptyIcon icon={icon} />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 650 }}>{title}</Typography>
            {description && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.35 }}>{description}</Typography>}
            {action && <Box sx={{ mt: 1.25 }}>{action}</Box>}
          </Box>
        </Stack>
      </TableCell>
    );
  }

  return (
    <Box
      sx={{
        py: 5,
        px: 3,
        textAlign: "center",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: "var(--b1-radius-panel)"
      }}
    >
      <Stack spacing={1.25} alignItems="center" sx={{ maxWidth: 480, mx: "auto" }}>
        <EmptyIcon icon={icon} />
        <Typography variant="h3" component="p">{title}</Typography>
        {description && <Typography variant="body2" color="text.secondary">{description}</Typography>}
        {action && <Box sx={{ pt: 1 }}>{action}</Box>}
      </Stack>
    </Box>
  );
};
