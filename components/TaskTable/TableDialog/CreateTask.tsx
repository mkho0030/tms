import { Dayjs } from "dayjs";
import { ProjectTypes } from "../../../types/db-data";
import { Controller, useForm } from "react-hook-form";
import { createTaskSchema } from "../../Form/taskSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { TextFieldElement } from "react-hook-form-mui";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTaskList } from "../../../logics/providers/TaskListContext";
import { UserType } from "../../../utils/mongo-users";

type createFormControl = {
  project_id?: string | undefined;
  dueDate?: Dayjs | undefined | null;
};

export const CreateTask = ({
  handleClose,
  project,
}: {
  handleClose: any;
  project?: ProjectTypes;
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
  });

  const [formControl, setFormControl] = useState<createFormControl>({
    project_id: "",
  });

  const [projects, setProjects] = useState<ProjectTypes[]>([]);
  const [options, setOptions] = useState<UserType[]>([]);

  const { submitCreateTaskForm } = useTaskList();

  useEffect(() => {
    if (formControl?.project_id) {
      setValue("project_id", formControl.project_id);
      const fetchData = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/projects?id=${formControl.project_id}`
        );
        const { data } = await res.json();
        console.log(data);
        return data;
      };

      fetchData()
        .then((res) => {
          setOptions(res.members);
        })
        .catch(console.error);
    }
    if (formControl?.dueDate) {
      setValue("dueDate", formControl.dueDate.toISOString());
    }

    return () => {};
  }, [formControl]);

  useEffect(() => {
    if (project) {
      setProjects([project]);
      setOptions(project.members);
      setFormControl({ ...formControl, project_id: project._id });
    } else {
      //
      const fetchData = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/projects`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        const { data } = await res.json();
        console.log(data);
        return data;
      };

      fetchData()
        .then((res) => setProjects(res))
        .catch(console.error);
    }
    return () => {};
  }, []);

  const onSubmit = async (values: z.infer<typeof createTaskSchema>) => {
    try {
      await submitCreateTaskForm(values);
      reset();
      handleClose();
    } catch (error) {}
  };

  return (
    <>
      <Box
        id="create-task-form"
        component={"form"}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            Create New Task
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <FormControl required fullWidth sx={{ mt: 2 }}>
            <InputLabel id="project_id">Project</InputLabel>
            <Select
              labelId="project_id"
              disabled={project && true}
              label="Project"
              value={formControl?.project_id}
              onChange={(val) =>
                setFormControl({ ...formControl, project_id: val.target.value })
              }
            >
              {projects &&
                projects.map((proj, index) => (
                  <MenuItem key={index} value={proj._id}>
                    {proj.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText></FormHelperText>
          </FormControl>
          <TextFieldElement
            fullWidth
            name="name"
            control={control}
            required
            id="name"
            label="Task name"
            placeholder="Task name"
          />
          <Controller
            name="dueDate"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(value) =>
                      setFormControl({ ...formControl, dueDate: value })
                    }
                    value={formControl.dueDate}
                    label="Due date"
                    name="endDate"
                    slotProps={{
                      textField: {
                        required: true,
                        fullWidth: true,
                        variant: "outlined",
                        error: !!error,
                        disabled: true,
                        helperText: error?.message,
                        sx: {
                          color: "rgba(0, 0, 0, 0.6) !important",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              );
            }}
          />
          <Controller
            name="assignees"
            control={control}
            render={({ field, fieldState: { error } }) => {
              const { onChange, onBlur, name } = field;

              return (
                <Autocomplete
                  multiple
                  onChange={(event, selectedOptions) => {
                    onChange(selectedOptions.map((options) => options.uid));
                  }}
                  onBlur={onBlur}
                  options={options}
                  getOptionLabel={(option) => option.uid}
                  renderTags={(value: readonly UserType[], getTagProps) =>
                    value.map((option, index: number) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          avatar={
                            <Avatar alt={option.name} src={option.photoUrl} />
                          }
                          variant="outlined"
                          label={option.name}
                          key={key}
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderOption={(props, option) => (
                    <MenuItem {...props} value={option.uid}>
                      <Avatar
                        sx={{ width: "28px", height: "28px", mr: 1 }}
                        alt={option.name}
                        src={option.photoUrl}
                      />
                      {option.name}
                    </MenuItem>
                  )}
                  renderInput={(params) => (
                    <TextField
                      name={name}
                      {...params}
                      label="Assigned to"
                      placeholder="Assignees"
                    />
                  )}
                />
              );
            }}
          />
          <TextFieldElement
            name="description"
            control={control}
            fullWidth
            multiline
            rows={4}
            id="description"
            label="Description"
            placeholder="Description"
          />
        </DialogContent>
      </Box>
      <DialogActions>
        <Button type="submit" form="create-task-form" variant="text">
          Create new task
        </Button>
      </DialogActions>
    </>
  );
};
