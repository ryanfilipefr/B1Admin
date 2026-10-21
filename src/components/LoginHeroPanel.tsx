import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/PeopleOutline";
import EventIcon from "@mui/icons-material/EventAvailableOutlined";
import VolunteerIcon from "@mui/icons-material/VolunteerActivismOutlined";
import TaskIcon from "@mui/icons-material/TaskAltOutlined";

const features = [
  { id: "people", icon: <PeopleIcon />, label: "Pessoas e famílias organizadas em um só lugar" },
  { id: "planning", icon: <EventIcon />, label: "Agenda, presenças e operação da semana" },
  { id: "care", icon: <VolunteerIcon />, label: "Cuidado pastoral com contexto e continuidade" },
  { id: "tasks", icon: <TaskIcon />, label: "Tarefas e acompanhamento da equipe" }
];

export const LoginHeroPanel: React.FC = () => (
  <Box
    sx={{
      flex: 1,
      display: { xs: "none", md: "flex" },
      flexDirection: "column",
      justifyContent: "center",
      p: { md: 6, lg: 8 },
      position: "relative",
      overflow: "hidden",
      bgcolor: "#163A46",
      color: "#FFFFFF",
      "&::before": {
        content: '""',
        position: "absolute",
        width: 420,
        height: 420,
        borderRadius: "50%",
        right: -180,
        top: -190,
        background: "rgba(178,138,74,0.16)"
      },
      "&::after": {
        content: '""',
        position: "absolute",
        width: 320,
        height: 320,
        borderRadius: "50%",
        left: -180,
        bottom: -200,
        background: "rgba(111,143,124,0.18)"
      }
    }}
  >
    <Box sx={{ position: "relative", zIndex: 1, maxWidth: 520 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 6 }}>
        <Box sx={{ width: 44, height: 44, display: "grid", placeItems: "center", borderRadius: 2.5, bgcolor: "#F4ECDD", color: "#163A46", fontWeight: 800, fontSize: 20 }}>
          H
        </Box>
        <Box>
          <Typography sx={{ fontSize: 22, lineHeight: 1.05, fontWeight: 760, letterSpacing: "-0.03em" }}>HubPastoral</Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.64)" }}>Gestão que serve pessoas</Typography>
        </Box>
      </Stack>

      <Typography component="h1" sx={{ fontSize: { md: 36, lg: 44 }, lineHeight: 1.08, fontWeight: 720, letterSpacing: "-0.045em", maxWidth: 500 }}>
        Menos sistemas soltos. Mais clareza para cuidar da igreja.
      </Typography>
      <Typography sx={{ mt: 2.5, mb: 5, color: "rgba(255,255,255,0.72)", fontSize: 16, lineHeight: 1.65, maxWidth: 480 }}>
        Uma central simples para acompanhar pessoas, equipes, presença e rotina pastoral sem depender de processos confusos.
      </Typography>

      <Stack spacing={2.25}>
        {features.map((feature) => (
          <Stack key={feature.id} direction="row" spacing={1.75} alignItems="center">
            <Box sx={{ width: 36, height: 36, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: 2, bgcolor: "rgba(255,255,255,0.09)", color: "#E9F0EB", "& svg": { fontSize: 19 } }}>
              {feature.icon}
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.84)" }}>{feature.label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  </Box>
);
