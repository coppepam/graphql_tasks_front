import { useMutation } from "@apollo/client";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DELETE_TASK } from "../mutations/taskMutations";
import { GET_TASKS } from "../queries/taskQueries";

type DeleteTaskProps = {
  id: number;
  userId: number;
};

export const DeleteTask = ({ id, userId }: DeleteTaskProps) => {
  const [deleteTask] = useMutation<{ deleteTask: { id: number } }>(DELETE_TASK);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await deleteTask({
        variables: {
          id,
        },
        refetchQueries: [{ query: GET_TASKS, variables: { userId } }],
      });
    } catch (err: unknown) {
      if ((err as Error).message === "Unauthorized") {
        localStorage.removeItem("token");
        alert("トークンの有効期限が切れました。サインイン画面に遷移します");
        navigate("/signin");
        return;
      }
      alert("タスクの削除に失敗しました");
    }
  };

  return (
    <div>
      <Tooltip title="Delete" arrow>
        <IconButton onClick={handleClick} color="warning">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
