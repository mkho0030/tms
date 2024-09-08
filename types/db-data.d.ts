export interface UserTypes {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
  settings: Object;
}

export  interface TaskTypes {
  id: string;
  name: string;
  status: string;
  assignees: string[];
  description: string;
  subtasks?: string[];
  startDate: Date;
  endDate: Date;
  createdOn: Date;
  updatedOn: Date;
}

export interface ProjectTypes {
  uid: string;
  members: string[];
  tasks: string[];
  name: string;
  icon: string;
  createdOn: Date | string;
  updatedOn: Date | string;
}