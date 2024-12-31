import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation createTask($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
      id
      name
      dueDate
      description
      status
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($updateTaskInput: UpdateTaskInput!) {
    updateTask(updateTaskInput: $updateTaskInput) {
      id
      name
      dueDate
      description
      status
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;