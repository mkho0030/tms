import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { createTaskSchema } from "../../components/Form/taskSchemas";
import { z } from "zod";
import { ProjectTypes, TaskTypes } from "../../types/db-data";
import { useRouter } from "next/router";
import { useToast } from "./ToastContext";
import { UserType } from "../../utils/mongo-users";
import dayjs from "dayjs";

//Functionality
// Search for task name
// Filter based on:
// - user - needs to get user list from project list (exclude if its my task)
// - Due by
// - Progress status
// Action buttons:
// - Create task
// - Update task
// - Delete task

interface TaskTableContextType {
  //Loading State
  isLoading: boolean;

  //Filter searching
  filters: FilterType;
  setFilters: Dispatch<SetStateAction<FilterType>>;

  //Get task List
  taskList: TaskTypes[] | undefined;
  filteredList: TaskTypes[] | undefined;
  projectData: ProjectTypes | undefined;

  //selected Task for processing
  selected: string[];
  handleClick: (event: React.MouseEvent<unknown>, id: string) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Task Processing
  submitCreateTaskForm: (values: z.infer<typeof createTaskSchema>) => unknown;
  updateStatus: (tasksIds: string[], status: number) => void;
  deleteTasks: (tasksIds: string[]) => void;
}

interface FilterType {
  search: string;
  assigned: UserType[];
  dueBy: number;
  status: number;
}

const initialState = {
  search: "",
  setSearch: () => {},
  filters: {
    search: "",
    assigned: [],
    dueBy: 0,
    status: 0,
  },
  taskList: [],
  filteredList: [],
  projectData: undefined,
  selected: [],
  handleClick: () => {},
  handleSelectAllClick: () => {},
  isLoading: true,
  setFilters: () => {},
  updateStatus: (tasksIds: string[], status: number) => {},
  deleteTasks: (tasksIds: string[]) => {},
  submitCreateTaskForm: async (values: z.infer<typeof createTaskSchema>) =>
    null,
};

const TaskTableContext = createContext<TaskTableContextType>(initialState);

export const TaskListProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<FilterType>(initialState.filters);

  const [taskList, setTaskList] = useState<TaskTypes[]>();
  const [filteredList, setFilteredList] = useState<TaskTypes[]>();
  const [projectData, setProjectData] = useState();

  const router = useRouter();
  const { setToast } = useToast();

  const [selected, setSelected] = useState<string[]>([]);

  // Fetch Tasks
  useEffect(() => {
    setIsLoading(true);
    const pagePath = router.pathname.split("/");
    if (pagePath[1] === "teams") {
      const { teamId, taskId } = router.query;

      const fetchTaskData = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks?projectId=${teamId}`,
          {
            method: "GET",
          }
        );
        const { data } = await res.json();
        return data;
      };

      const fetchProjectData = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/projects?id=${teamId}`
        );
        const {data} = await res.json();
        console.log(data);
        return data;
      };

      fetchTaskData().then((data) => {
        setTaskList(data);
        fetchProjectData().then((data) => {
          setProjectData(data);
          setIsLoading(false);
          setFilters(initialState.filters);
        });
      });
    }
    else {
      const fetchData = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks`,
          {
            method: "GET",
          }
        );
        const { data } = await res.json();
        return data;
      };

      fetchData().then((data) => {
        setTaskList(data);
        setIsLoading(false);
        setFilters(initialState.filters);
      });
    }

    return () => {};
  }, [router]);

  useEffect(() => {
    let list = taskList;

    if (filters.search.length !== 0) {
      list = list?.filter((task) =>
        task.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.assigned.length != 0) {
      filters.assigned.map((selectedAssignees) => {
        list = list?.filter((task) =>
          task.assignees.some(
            (assignees) => assignees.uid == selectedAssignees.uid
          )
        );
      });
    }

    if (filters.dueBy != 0) {
      const today = dayjs();
      if (filters.dueBy == 1) {
        list = list?.filter(
          (task) =>
            dayjs(task.endDate).isAfter(today) &&
            dayjs(task.endDate).isBefore(today.add(1, "day"))
        );
      }
      if (filters.dueBy == 2) {
        list = list?.filter(
          (task) =>
            dayjs(task.endDate).isAfter(today) &&
            dayjs(task.endDate).isBefore(today.add(7, "day"))
        );
      }
      if (filters.dueBy == 3) {
        list = list?.filter(
          (task) =>
            dayjs(task.endDate).isAfter(today) &&
            dayjs(task.endDate).isBefore(today.add(14, "day"))
        );
      }
      if (filters.dueBy == 4) {
        list = list?.filter(
          (task) =>
            dayjs(task.endDate).isAfter(today) &&
            dayjs(task.endDate).isBefore(today.add(1, "month"))
        );
      }
    }

    if (filters.status !== 0) {
      list = list?.filter((task) => task.status == filters.status - 1);
    }

    setFilteredList(list);

    return () => {};
  }, [filters, taskList]);

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredList?.map((n) => n._id);
      if (newSelected) setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const submitCreateTaskForm = async (
    values: z.infer<typeof createTaskSchema>
  ) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tasks`, {
      method: "POST",
      body: JSON.stringify({ ...values }),
    });

    if (res.status == 201) {
      setToast({
        message: "Task Created!",
        type: "success",
      });

      const { data } = await res.json();
      return data;
      // setIsLoading(false);
      // router.reload();
    }
  };

  const updateStatus = async (tasksIds: string[], status: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks/update`,
        {
          method: "POST",
          body: JSON.stringify({
            taskIds: tasksIds,
            status: status,
          }),
        }
      );

      if (res.status == 200) {
        setToast({
          message: "Tasks status updated!",
          type: "success",
        });
        router.reload();
      }

      console.log(res);
    } catch (error) {}
  };

  const deleteTasks = async (tasksIds: string[]) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks/delete`,
        {
          method: "DELETE",
          body: JSON.stringify({
            taskIds: tasksIds,
          }),
        }
      );

      if (res.status == 200) {
        setToast({
          message: "Tasks deleted!",
          type: "success",
        });
        router.reload();
      }

      console.log(res);
    } catch (error) {}
  };

  const value = {
    taskList,
    filters,
    setFilters,
    filteredList,
    projectData,
    isLoading,
    selected,
    handleClick,
    handleSelectAllClick,
    updateStatus,
    submitCreateTaskForm,
    deleteTasks,
  };

  return (
    <TaskTableContext.Provider value={value}>
      {children}
    </TaskTableContext.Provider>
  );
};

export const useTaskList = () => {
  const context = useContext(TaskTableContext);

  if (context === undefined)
    throw new Error("useTaskTable must be used within TaskTableProvider");

  return context;
};
