import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers , addUser } from "../store";
import type { RootState, AppDispatch } from "../store";
import Loader from "./ui/Loader";
import ErrorCard from "./ui/ErrorCard";
import ErrorMsg from "./ui/ErrorMsg";
import Button from "./ui/Button";

const UsersList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isLoading, data, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  const HandleUserAdd = () => {
    dispatch(addUser());
  }

  if (isLoading) {
    return <Loader className="h-10 w-full" time={6} />;
  }

  if (error) {
    return (
        <div className="flex items-center justify-center h-screen flex-col gap-8">
        <ErrorCard />
        <ErrorMsg message={error.message} />
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
      <div className="flex grow justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={HandleUserAdd}>+ Add User</Button>
      </div>
      <div>{RenderedUsers}</div>
    </div>
  );
};

export default UsersList;
