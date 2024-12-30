import { TaskStatus } from "./taskSttus";

export type Task = {
  id: number;
  name: string;
  dueDate: string;
  status: TaskStatus;
  description: string;
}