import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../logics/providers/AuthContext";
import { useToast } from "../../logics/providers/ToastContext";

const Configure: React.FC = () => {
  const { user } = useAuth();
  const { setToast } = useToast();
  const [copied, setCopied] = useState(false);

  const onClickCopy = async () => {
    const result = await fetch("/api/ical/generate");
    if (result.ok) {
      const data = await result.json();
      navigator.clipboard.writeText(data.url);
      setToast({
        message: "Link copied to clipboard",
        type: "success",
      });
      setCopied(true);
    }
  };

  return (
    <>
      <Box
        flex={1}
        sx={{ p: 2, gap: "8px", display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h4">Export Calendar</Typography>
        <Button variant="contained" onClick={onClickCopy}>
          {copied ? <span>Link Copied</span> : <span> Copy Link</span>}
        </Button>
        <Typography variant="subtitle1">
          Paste this link into Google Calendar or other iCal compatible
          calendars to get live updates and notifications on your deadlines
        </Typography>
      </Box>
    </>
  );
};

export default Configure;
