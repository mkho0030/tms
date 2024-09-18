export interface UserTypes {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
  settings: Object;
}

export  interface TaskTypes {
  _id: string;
  name: string;
  status: 0 | 1 | 2;
  assignees: string[] | UserTypes [];
  description: string;
  subtasks?: string[];
  startDate: Date;
  endDate: Date;
  createdOn: Date;
  updatedOn: Date;
  projectId: string;
}

export interface ProjectTypes {
  _id: string;
  members: UserTypes[];
  tasks: string[];
  name: string;
  icon: string;
  createdOn: Date | string;
  updatedOn: Date | string;
}
