import { createContext, useContext, useEffect, useState } from "react";
import { TaskType } from "../../utils/mongo-tasks";
import { TaskTypes } from "../../types/db-data";
import { useRouter } from "next/router";
import { useToast } from "./ToastContext";

type TaskContextType = {
  isLoading: boolean;
  task: TaskTypes | undefined;
  deleteTask: (tasksId: string) => void;
  updateTask: (task: TaskType) => void;
  refetchData: () => void;
};

const initialState = {
  isLoading: true,
  task: undefined,
  deleteTask: async (taskId: string) => {},
  updateTask: async (task: TaskType) => {},
  refetchData: () => {},
};

const TaskContext = createContext<TaskContextType>(initialState);

export const TaskProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [task, setTask] = useState<TaskTypes>();

  const router = useRouter();
  const { setToast } = useToast();

  const fetchData = async () => {
    const { teamId, taskId } = router.query;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks?id=${taskId}`
    );
    const { data } = await res.json();
    return data;
  };

  const refetchData = () => {
    setIsLoading(true);
    fetchData()
      .then((data) => {
        setTask(data);
        setIsLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    setIsLoading(true);
    const { teamId, taskId } = router.query;
    if (taskId) {
      fetchData()
        .then((data) => {
          setTask(data);
          setIsLoading(false);
        })
        .catch(console.error);
    }

    return () => {};
  }, [router]);

  const deleteTask = async (taskId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks/delete`,
        {
          method: "DELETE",
          body: JSON.stringify({
            taskIds: [taskId],
          }),
        }
      );

      if (res.status == 200) {
        setToast({
          message: "Tasks deleted!",
          type: "success",
        });
        router.back();
      }

      console.log(res);
    } catch (error) {
      setToast({
        message: "Error Occurred.",
        type: "error",
      });
    }
  };

  const updateTask = async (task: TaskType) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tasks/update`,
        {
          method: "POST",
          body: JSON.stringify({
            task: task,
          }),
        }
      );

      if (res.status == 200) {
        setToast({
          message: "Task Updated!",
          type: "success",
        });
      }
    } catch (error) {
      setToast({
        message: "Error Occurred.",
        type: "error",
      });
    }
  };

  const generateIcal = async () => {
    try {
      const iCalRes = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/ical/generate`
      );
      const iCalData = await iCalRes.json();

      const ical = await fetch(iCalData.url);
      const { data } = await ical.json();

      
      console.log(data)
      const element = document.createElement("a");
      const file = new File([data], "event.ics");
      element.href = URL.createObjectURL(file);
      element.download = `event.ics`;
      document.body.appendChild(element);
      element.click();
    } catch (error) {
      console.log(error)
    }
  };

  const value = {
    isLoading,
    task,
    deleteTask,
    updateTask,
    refetchData,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("useTask must be used within TaskProvider");

  return context;
};
