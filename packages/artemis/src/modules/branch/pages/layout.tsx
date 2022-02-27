import { SettingsIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { Layout } from "@components/shared/layout";
import { TooltipButton } from "@ui/tooltip-button";
import { TabsNavigation } from "src/modules/tabs/tabs-navigation";
import { Tabs } from "../../tabs";
import { BranchSettings } from "../settings";
import { useBranch } from "./context";
import { branchTabs } from "./tabs";

export const BranchLayout: React.FC = ({ children }) => {
  const branchSettings = useDisclosure();
  const { branch } = useBranch();

  return (
    <>
      <Layout title={branch.name}>
        <Tabs tabs={branchTabs}>
          <TabsNavigation>
            <TooltipButton
              onClick={branchSettings.onOpen}
              label="Settings"
              placement="right"
              icon={<SettingsIcon />}
              variant="ghost"
            />
          </TabsNavigation>
        </Tabs>
        {children}
      </Layout>
      <BranchSettings control={branchSettings} />
    </>
  );
};
