import { useEffect } from "react";
import { useSelector } from "react-redux"; 
import { fetchUsers, addUser } from "../store";
import type { RootState } from "../store"; 
import Loader from "./ui/Loader";
import ErrorCard from "./ui/ErrorCard";
import ErrorMsg from "./ui/ErrorMsg";
import Button from "./ui/Button";
import { useThunk } from "./hooks/useThunk";
import Spinner from "./ui/Spinner";
import UsersListItems from "./UsersListItems";

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

  let Content;
  if (isLoadingUsers) {
    Content = <Loader className="h-10 w-full" time={6} />;
  } else if (fetchUsersError) {
    Content = (
      <div className="flex items-center justify-center h-screen flex-col gap-8">
        <ErrorCard />
        <ErrorMsg message={fetchUsersError.message} />
      </div>
    );
  } else {
Content = data.map((user) => (
  <UsersListItems key={user.id} user={user} />
));


  }


  return (
    <div>
      <div className="flex grow justify-between m-3 items-center">
        <h1 className="m-2 text-xl">Users</h1>
        <div className="flex items-center gap-2">
          {isCreatingUser ? (
            <Spinner />
          ) : (
            <Button onClick={HandleUserAdd} disabled={isCreatingUser}>
              {"+ Add User"}
            </Button>
          )}
          {createUserError && !isCreatingUser&& (
            <ErrorMsg message={createUserError.message} key={Date.now()} />
          )}
        </div>
      </div>
      <div>{Content}</div>
    </div>
  );
};

export default UsersList;
