import React from "react";
import { Box, Typography, Chip, Avatar, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const TaskDetails: React.FC = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mt={4}
      >
        <Box
          display="flex"
          flex={"1 0 auto"}
          gap="40px"
          alignItems="left"
        >
          <Typography variant="subtitle1" color="grey.600">
            Progress:
          </Typography>
          <Chip label="In Progress" color="warning"></Chip>
        </Box>
        <Box
          flex={"1 0 auto"}
          display="flex"
          gap="40px"
          alignItems="left"
        >
          <Typography variant="subtitle1" color="grey.600">
            Due Date:
          </Typography>
          <Typography variant="body1">August 31, 2024</Typography>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mt={2}
      >
        <Box display="flex" gap="40px" alignItems="center">
          <Typography variant="subtitle1" color="grey.600">
            Assigned To:
          </Typography>

          <Box display="flex" alignItems="center" gap="4px">
            <Avatar sx={{ bgcolor: "red", width: '24px', height: '24px' }}>U</Avatar>
            <Typography variant="subtitle2">User 1</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="4px">
            <Avatar sx={{ bgcolor: "blue", width: '24px', height: '24px'  }}>U</Avatar>
            <Typography variant="subtitle2">User 2</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="4px">
            <Avatar sx={{ bgcolor: "orange", width: '24px', height: '24px'  }}>U</Avatar>
            <Typography variant="subtitle2">User 3</Typography>
          </Box>

          <Button variant="text" sx={{ color: "grey" }}>
            <PersonAddIcon />
          </Button>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mt={2}
      >
        <Typography variant="subtitle1" color="grey.600">
          Description:
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mt={2}
      >
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          viverra dui ut eros porttitor, non cursus enim dictum. Fusce in libero
          eu sapien fringilla tempor at a nisi. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Integer ac
          nisi lacinia, interdum velit id, aliquam turpis. Donec at diam id erat
          mollis laoreet. Curabitur nec ultricies eros, nec dictum augue.
          Praesent scelerisque nunc id turpis pharetra, sed hendrerit mauris
          bibendum.
        </Typography>
      </Box>
    </>
  );
};

export default TaskDetails;
