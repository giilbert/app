import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useEvent } from "../../context";
import { CreateLink } from "./create-link";
import EventHeader from "../../header";
import { LinksGrid } from "./links-grid";

interface LinksTabProps {
  linkCreate: UseDisclosureReturn;
}

export const LinksTab: React.FC<LinksTabProps> = ({ linkCreate }) => {
  const { onOpen, isOpen, onClose } = linkCreate;

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.altKey && event.key === "n") {
        event.preventDefault();
        onOpen();
      }
    });
  }, []);

  return (
    <>
      <LinksGrid />
      <CreateLink isOpen={isOpen} onClose={onClose} />
    </>
  );
};
