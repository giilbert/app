import {
  Flex,
  Menu,
  MenuItem,
  MenuList,
  useColorModeValue,
  UseDisclosureReturn,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { MouseEvent, useState } from "react";
import { IconType } from "react-icons";
import { DeleteItem } from "./delete-item";

export const ContextItem: React.FC<{
  text: string;
  onClick: (event?: MouseEvent) => Promise<void> | void;
  Icon: IconType;
}> = ({ text, Icon, onClick }) => {
  const [loading, setLoading] = useState(false);

  return (
    <MenuItem
      icon={<Icon />}
      onClick={async (event) => {
        setLoading(true);
        await onClick(event);
        setLoading(false);
      }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text>{text}</Text>
        {loading && <Spinner size="sm" />}
      </Flex>
    </MenuItem>
  );
};
