import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import { AssignmentTurnedInOutlined as TasksIcon, Groups2Outlined as GroupsIcon } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { Locale, UniqueIdHelper, UserHelper } from "@churchapps/apphelper";
import { type GroupMemberInterface, type TaskInterface } from "@churchapps/helpers";
import { NewTask } from "../../serving/tasks/components/NewTask";
import { TextAction, VerbRow } from "../../components/ui";
import { hasAllGroupsAccess } from "../../helpers";

const linkSx = { fontWeight: 650, color: "text.primary" } as const;

const WorkSection = ({ icon, title, action, children }: { icon: React.ReactNode; title: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <Box
    component="section"
    sx={{
      p: { xs: 2, md: 2.5 },
      borderRadius: 2.5,
      border: 1,
      borderColor: "divider",
      bgcolor: "background.paper",
      minHeight: 180
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1.25}>
        <Box sx={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 2, bgcolor: "var(--b1-selected)", color: "var(--b1-on-selected)" }}>
          {icon}
        </Box>
        <Typography variant="h6">{title}</Typography>
      </Stack>
      {action}
    </Stack>
    {children}
  </Box>
);

export const MyWork: React.FC = () => {
  const personId = UserHelper.person?.id || "";
  const [showAdd, setShowAdd] = useState(false);
  const canAllGroups = hasAllGroupsAccess();

  const tasksQuery = useQuery<TaskInterface[]>({ queryKey: ["/tasks", "DoingApi"], enabled: !UniqueIdHelper.isMissing(personId), placeholderData: [] });
  const groupsQuery = useQuery<GroupMemberInterface[]>({ queryKey: ["/groupmembers?personId=" + personId, "MembershipApi"], enabled: !UniqueIdHelper.isMissing(personId), placeholderData: [] });

  const myTasks = useMemo(() => (tasksQuery.data || []).filter((t) => t.assignedToId === personId && t.status === "Open").slice(0, 4), [tasksQuery.data, personId]);
  const myGroups = groupsQuery.data || [];

  return (
    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, alignItems: "stretch" }}>
      <WorkSection
        icon={<TasksIcon fontSize="small" />}
        title="Minhas tarefas"
        action={
          <VerbRow>
            {!showAdd && <TextAction small onClick={() => setShowAdd(true)} aria-label="Adicionar tarefa" data-testid="add-task-button">Adicionar</TextAction>}
            <TextAction small to="/serving/tasks" component={Link}>Ver todas</TextAction>
          </VerbRow>
        }
      >
        {showAdd && (
          <Box sx={{ mb: 2 }}>
            <NewTask compact onCancel={() => setShowAdd(false)} onSave={() => { tasksQuery.refetch(); setShowAdd(false); }} />
          </Box>
        )}
        {myTasks.length === 0
          ? (
            <Box sx={{ py: 1 }}>
              <Typography variant="body2" color="text.secondary">Nenhuma tarefa aberta atribuída a você.</Typography>
              <Typography variant="caption" color="text.secondary">Quando algo precisar da sua ação, aparecerá aqui.</Typography>
            </Box>
          )
          : (
            <Stack component="ul" spacing={1.25} sx={{ listStyle: "none", m: 0, p: 0 }}>
              {myTasks.map((t) => (
                <li key={t.id}>
                  <MuiLink component={Link} to={"/serving/tasks/" + t.id} underline="hover" sx={linkSx}>{t.title}</MuiLink>
                </li>
              ))}
            </Stack>
          )}
      </WorkSection>

      <WorkSection
        icon={<GroupsIcon fontSize="small" />}
        title="Meus grupos"
        action={canAllGroups ? <TextAction small to="/groups" component={Link}>Ver todos</TextAction> : undefined}
      >
        {myGroups.length === 0
          ? (
            <Box sx={{ py: 1 }}>
              <Typography variant="body2" color="text.secondary">Você ainda não participa de nenhum grupo.</Typography>
              <Typography variant="caption" color="text.secondary">Os grupos vinculados ao seu perfil aparecerão aqui.</Typography>
            </Box>
          )
          : (
            <Stack spacing={1.25}>
              {myGroups.map((gm) => (
                <MuiLink key={gm.id} component={Link} to={"/groups/" + gm.groupId} underline="hover" sx={linkSx}>{gm.group?.name || Locale.label("people.groups.unknownGroup")}</MuiLink>
              ))}
            </Stack>
          )}
      </WorkSection>
    </Box>
  );
};
