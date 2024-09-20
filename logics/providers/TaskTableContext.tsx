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
  //Filter searching
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filters: FilterType;
  setFilters: Dispatch<SetStateAction<FilterType>>;
  //Get task List
  taskList: TaskTypes[] | undefined;
  //select
  selected: string[];
  handleClick: (event: React.MouseEvent<unknown>, id: string) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  submitCreateTaskForm: (values: z.infer<typeof createTaskSchema>) => void;
  updateStatus: (tasksIds: string[], status: number) => void;
  deleteTasks: (tasksIds: string[]) => void;
}

interface FilterType {
  assigned: string;
  dueBy: number;
  status: string;
}

const initialState = {
  search: "",
  setSearch: () => {},
  filters: {
    assigned: "",
    dueBy: 0,
    status: "",
  },
  taskList: [],
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

export const TaskTableProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterType>({
    assigned: "",
    dueBy: 0,
    status: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [taskList, setTaskList] = useState<TaskTypes[]>(initialState.taskList);

  const router = useRouter();
  const { setToast } = useToast();

  const [selected, setSelected] = useState<string[]>([]);

  // Fetch Tasks
  useEffect(() => {
    setIsLoading(true);
    const pagePath = router.pathname.split("/");
    if (pagePath[1] === "teams") {
      const { teamId } = router.query;

      const fetchData = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks?projectId=${teamId}`,
          {
            method: "GET",
          }
        );
        const { data } = await res.json();
        console.log(data);
        return data;
      };

      fetchData().then((data) => {
        setTaskList(data);
        setIsLoading(false);
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
        console.log(data);
        return data;
      };

      fetchData().then((data) => {
        setTaskList(data);
        setIsLoading(false);
      });
    }

    return () => {};
  }, [router]);

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
      const newSelected = taskList.map((n) => n._id);
      setSelected(newSelected);
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

      const data = await res.json();

      // setIsLoading(false);
      router.reload();
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
    search,
    setSearch,
    filters,
    setFilters,
    taskList,
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

export const useTaskTable = () => {
  const context = useContext(TaskTableContext);

  if (context === undefined)
    throw new Error("useTaskTable must be used within TaskTableProvider");

  return context;
};
