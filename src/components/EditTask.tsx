import { useMutation } from "@apollo/client";
import EditIcon from "@mui/icons-material/Edit";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UPDATE_TASK } from "../mutations/taskMutations";
import { GET_TASKS } from "../queries/taskQueries";
import { Task } from "../types/task";
import { TaskStatus } from "../types/taskSttus";

type EditTaskProps = {
  task: Task;
  userId: number;
};

export const EditTask = ({ task, userId }: EditTaskProps) => {
  const {
    id,
    name: taskName,
    dueDate: taskDueDate,
    description: taskDescription,
    status: taskStatus,
  } = task;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(taskName);
  const [dueDate, setDueDate] = useState(taskDueDate);
  const [description, setDescription] = useState(taskDescription || "");
  const [status, setStatus] = useState(taskStatus);
  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidDueDate, setIsInvalidDueDate] = useState(false);
  const [updateTask] = useMutation<{ updateTask: Task }>(UPDATE_TASK);
  const navigate = useNavigate();

  const resetState = () => {
    setName(taskName);
    setDueDate(taskDueDate);
    setDescription(taskDescription);
    setStatus(taskStatus);
    setIsInvalidName(false);
    setIsInvalidDueDate(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  const handleEdit = async () => {
    let canEdit = true;

    if (name.length === 0) {
      canEdit = false;
      setIsInvalidName(true);
    } else {
      setIsInvalidName(false);
    }
    if (!Date.parse(dueDate)) {
      canEdit = false;
      setIsInvalidDueDate(true);
    } else {
      setIsInvalidDueDate(false);
    }

    if (!canEdit) {
      return;
    }

    const updateTaskInput = {
      id,
      name,
      dueDate,
      description,
      status,
    };

    try {
      await updateTask({
        variables: { updateTaskInput },
        refetchQueries: [{ query: GET_TASKS, variables: { userId } }],
      });
    } catch (err: unknown) {
      if ((err as Error).message === "Unauthorized") {
        localStorage.removeItem("token");
        alert("トークンの有効期限が切れました。サインイン画面に遷移します");
        navigate("/signin");
        return;
      }
      alert("タスクの更新に失敗しました");
    }

    resetState();
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Task Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={isInvalidName}
            helperText={isInvalidName && "タスク名を入力してください"}
          />
          <TextField
            autoFocus
            margin="normal"
            id="dueDate"
            label="Due Date"
            fullWidth
            placeholder="yyyy-mm-dd"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            error={isInvalidDueDate}
            helperText={isInvalidDueDate && "日付け意識で入力してください"}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="task-status-label">Status</InputLabel>
            <Select
              labelId="task-status-label"
              id="task-status"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              <MenuItem value="NOT_STARTED">Not Started</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="normal"
            id="description"
            label="Description"
            fullWidth
            multiline={true}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
