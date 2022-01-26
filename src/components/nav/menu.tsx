import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { EventTabs } from "@components/event/executive/context";
import { signOut } from "next-auth/react";
import { Router, useRouter } from "next/router";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { DashboardTabs } from "../dashboard/executive/context";

export const NavMenu: React.FC<{
  tabs: typeof EventTabs | typeof DashboardTabs;
}> = ({ tabs }) => {
  const menuColor = useColorModeValue("bg.100", "bg.800");
  const router = useRouter();

  return (
    <Menu autoSelect={false}>
      <MenuButton as={IconButton} icon={<HamburgerIcon />} aria-label="menu" />
      <MenuList bgColor={menuColor}>
        {Object.values(tabs).map((value, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              router.push(`/event/${router.query.slug}${value.url}`);
            }}
          >
            {value.publicName}
          </MenuItem>
        ))}
        <MenuDivider />
        <MenuItem
          onClick={() => router.push("/settings")}
          icon={<SettingsIcon />}
        >
          Settings
        </MenuItem>
        <MenuItem onClick={() => signOut()} icon={<FiLogOut />}>
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
