import { useQuery } from "@apollo/client";
import { Stack, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { GET_TASKS } from "../queries/taskQueries";
import { Payload } from "../types/payload";
import { Task } from "../types/task";
import { AddTask } from "./AddTask";
import Header from "./Header";
import { Loading } from "./Loading";
import { TaskTable } from "./TaskTable";

const Main = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<Payload>(token!);
  const userId = decodedToken.sub;

  const { loading, error, data } = useQuery<{ getTasks: Task[] }>(GET_TASKS, {
    variables: { userId },
  });

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     if (decodedToken.exp * 1000 < Date.now()) {
  //       localStorage.removeItem("token");

  //       navigate("/signin");
  //     }
  //   }
  // }, []);

  return (
    <>
      <Header />
      <Stack spacing={4} direction={"column"} m={8} alignItems={"center"}>
        {loading && <Loading />}
        {error && <Typography color="error">{error.message}</Typography>}
        {!loading && !error && (
          <>
            <AddTask userId={userId} />
            <TaskTable tasks={data?.getTasks} userId={userId} />
          </>
        )}
      </Stack>
    </>
  );
};

export default Main;
