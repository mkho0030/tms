import { UserType } from "../utils/mongo-users";

export  interface TaskTypes {
  _id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  assignees: UserType [];
  children?: TaskTypes[];
  status: 0 | 1 | 2;
  projectId: string;  
  createdOn: Date;
  updatedOn: Date;
}

export interface ProjectTypes {
  _id: string;
  members: UserType[];
  tasks: string[];
  name: string;
  icon: string;
  createdOn: Date | string;
  updatedOn: Date | string;
}
