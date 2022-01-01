import { IconButton, Tooltip, VStack } from "@chakra-ui/react";
import React from "react";
import { BsFillCalendarEventFill, BsFillPersonLinesFill } from "react-icons/bs";
import { DashboardTabs, useDashboard } from "../dashboard/executive/context";

export const TabButtons: React.FC = () => {
  const { selectedTab, setSelectedTab } = useDashboard();

  return (
    <VStack>
      <Tooltip label="View Events" placement="right">
        <IconButton
          aria-label="View Events"
          variant={selectedTab === DashboardTabs.EVENTS ? "solid" : "ghost"}
          icon={<BsFillCalendarEventFill />}
          onClick={() => setSelectedTab(DashboardTabs.EVENTS)}
        />
      </Tooltip>
      <Tooltip label="View Members" placement="right">
        <IconButton
          aria-label="View Members"
          variant={selectedTab === DashboardTabs.MEMBERS ? "solid" : "ghost"}
          icon={<BsFillPersonLinesFill />}
          onClick={() => setSelectedTab(DashboardTabs.MEMBERS)}
        />
      </Tooltip>
    </VStack>
  );
};
