import React, { useState } from "react";

const useIsOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return { isOpen, handleOpen, handleClose };
};

export default useIsOpen;
