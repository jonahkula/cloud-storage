import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Folder({ folder }) {
  return (
    <Button
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      variant="outline-dark"
      className="text-truncate w-100"
      as={Link}
    >
      <FontAwesomeIcon icon={faFolder} className="mx-1" />
      <span className="mx-1">{folder.name}</span>
    </Button>
  );
}
