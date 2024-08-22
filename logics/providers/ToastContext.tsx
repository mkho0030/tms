import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";

type ToastType = {
  message: string;
  type: "error" | "success" | "info" | "warning";
};

interface ToastContextType {
  toast: ToastType | undefined;
  setToast: (toast: ToastType) => void;
}

const initialState: ToastContextType = {
  toast: undefined,
  setToast: () => null,
};

const ToastContext = createContext<ToastContextType>(initialState);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastType | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const value = {
    toast,
    setToast: (toast: ToastType) => {
      setToast(toast);
    },
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };

  // Use to allow toast to be shown when setToast is called
  useEffect(() => {
    toast && setIsOpen(true);
    return () => {};
  }, [toast]);

  // Used to reset toast to undefined
  useEffect(() => {
    let setDelay: NodeJS.Timeout | undefined;
    if (!isOpen) {
      setDelay = setTimeout(() => {
        setToast(undefined);
      }, 1500);
    }
    return () => {
      clearTimeout(setDelay);
    };
  }, [isOpen]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={4500}
        open={isOpen}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={toast?.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined)
    throw new Error("useToast must be used within ToastProvider");

  return context;
};
