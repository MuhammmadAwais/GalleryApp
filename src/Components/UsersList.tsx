import { useEffect } from "react";
import { useSelector } from "react-redux"; 
import { fetchUsers, addUser } from "../store";
import type { RootState } from "../store"; 
import Loader from "./ui/Loader";
import ErrorCard from "./ui/ErrorCard";
import ErrorMsg from "./ui/ErrorMsg";
import Button from "./ui/Button";
import { useThunk } from "./hooks/useThunk";

const UsersList: React.FC = () => {

  const [runFetchUsers, isLoadingUsers, fetchUsersError] = useThunk(fetchUsers);

  const [runCreateUser, isCreatingUser, createUserError] = useThunk(addUser);

  const { data } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    runFetchUsers();
  }, [runFetchUsers]); 

  const HandleUserAdd = () => {

    runCreateUser();
  };


  if (isLoadingUsers) {
    return <Loader className="h-10 w-full" time={6} />;
  }

  if (fetchUsersError) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-8">
        <ErrorCard />
        <ErrorMsg message={fetchUsersError.message} />
      </div>
    );
  }

  const RenderedUsers = data.map((user) => (
    <div key={user.id} className="mb-2 rounded border">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
  ));

  return (
    <div>
      <div className="flex grow justify-between m-3 items-center">
        <h1 className="m-2 text-xl">Users</h1>
        <div className="flex items-center gap-2">

          <Button onClick={HandleUserAdd} disabled={isCreatingUser}>
            {isCreatingUser ? <Loader time={6} /> : "+ Add User"}
          </Button>
          {createUserError && <ErrorMsg message={createUserError.message} />}
        </div>
      </div>
      <div>{RenderedUsers}</div>
    </div>
  );
};

export default UsersList;
