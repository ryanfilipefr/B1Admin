import { Stack, Box, Typography, Button } from "@mui/material";
import { NotificationsActive as AttentionIcon, EventAvailable as ApprovalsIcon, GroupAdd as JoinRequestIcon, ArrowForward as ArrowIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { QuickActionItem, SundayService } from "./components";
import { MyWork } from "./components/MyWork";
import { Locale, Permissions, UserHelper } from "@churchapps/apphelper";
import { PageContainer } from "../components/ui/PageContainer";
import { PageHeader } from "../components/ui/PageHeader";
import { CardWithHeader } from "../components/ui/CardWithHeader";
import { Surface } from "../components/ui/Surface";
import { usePendingApprovalsCount, usePendingJoinRequestsCount } from "../hooks";

export const DashboardPage = () => {
  const pendingApprovals = usePendingApprovalsCount();
  const pendingJoinRequests = usePendingJoinRequestsCount();
  const needsAttention = pendingApprovals > 0 || pendingJoinRequests > 0;
  const churchName = UserHelper.currentUserChurch?.church?.name || "sua igreja";
  const canViewPeople = UserHelper.checkAccess(Permissions.membershipApi.people.view);
  const canViewAttendance = UserHelper.checkAccess(Permissions.attendanceApi.attendance.viewSummary);

  return (
    <>
      <PageHeader
        title="Visão geral"
        subtitle="Prioridades, pessoas e operação pastoral em um só lugar."
      />

      <PageContainer>
        <Stack spacing={3}>
          <Box
            component="section"
            aria-label="Resumo do HubPastoral"
            sx={{
              position: "relative",
              overflow: "hidden",
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 3.5,
              bgcolor: "var(--b1-header)",
              color: "var(--b1-on-header)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 18px 42px rgba(22, 58, 70, 0.12)",
              "&::after": {
                content: '""',
                position: "absolute",
                width: 280,
                height: 280,
                borderRadius: "50%",
                right: -100,
                top: -150,
                background: "rgba(178, 138, 74, 0.14)"
              }
            }}
          >
            <Stack spacing={2.5} sx={{ position: "relative", zIndex: 1 }}>
              <Box>
                <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.68)", letterSpacing: "0.12em" }}>
                  HUBPASTORAL
                </Typography>
                <Typography variant="h2" sx={{ mt: 0.5, color: "inherit", maxWidth: 720 }}>
                  O que precisa da sua atenção em {churchName}
                </Typography>
                <Typography sx={{ mt: 1, color: "rgba(255,255,255,0.76)", maxWidth: 720 }}>
                  Comece pelas pendências e depois siga para a rotina da equipe. Menos navegação, mais clareza sobre o próximo passo.
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {canViewPeople && (
                  <Button
                    component={Link}
                    to="/people"
                    variant="contained"
                    endIcon={<ArrowIcon />}
                    sx={{ bgcolor: "#FFFFFF", color: "#163A46", "&:hover": { bgcolor: "#F4ECDD" } }}
                  >
                    Ver pessoas
                  </Button>
                )}
                {canViewAttendance && (
                  <Button
                    component={Link}
                    to="/attendance"
                    variant="outlined"
                    sx={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.38)", bgcolor: "transparent", "&:hover": { borderColor: "#FFFFFF", bgcolor: "rgba(255,255,255,0.08)" } }}
                  >
                    Acompanhar presenças
                  </Button>
                )}
                <Button
                  component={Link}
                  to="/serving/tasks"
                  variant="text"
                  sx={{ color: "#FFFFFF", "&:hover": { bgcolor: "rgba(255,255,255,0.08)" } }}
                >
                  Minhas tarefas
                </Button>
              </Stack>
            </Stack>
          </Box>

          {needsAttention && (
            <Box data-testid="needs-attention">
              <CardWithHeader title="Precisa de atenção" icon={<AttentionIcon />}>
                <Stack>
                  {pendingApprovals > 0 && (
                    <QuickActionItem icon={<ApprovalsIcon fontSize="small" />} title={Locale.label("dashboard.needsAttention.approvals").replace("{count}", String(pendingApprovals))} linkUrl="/calendars/approvals" />
                  )}
                  {pendingJoinRequests > 0 && (
                    <QuickActionItem icon={<JoinRequestIcon fontSize="small" />} title={Locale.label("dashboard.needsAttention.joinRequests").replace("{count}", String(pendingJoinRequests))} linkUrl="/groups/pending" />
                  )}
                </Stack>
              </CardWithHeader>
            </Box>
          )}

          <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 0.9fr) minmax(0, 1.1fr)" }, alignItems: "start" }}>
            <SundayService />
            <Surface>
              <Box sx={{ p: { xs: 0.5, md: 1 } }}>
                <Typography variant="overline" color="text.secondary">ROTINA</Typography>
                <Typography variant="h3" sx={{ mt: 0.5, mb: 2.5 }}>Seu trabalho agora</Typography>
                <MyWork />
              </Box>
            </Surface>
          </Box>
        </Stack>
      </PageContainer>
    </>
  );
};
