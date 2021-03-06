import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

export default function File({ file }) {
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noreferrer"
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFile} className="mx-1" />
      <span className="mx-1">{file.name}</span>
    </a>
  );
}
