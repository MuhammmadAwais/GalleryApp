import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/Thunks/fetchUsers";
import type { RootState, AppDispatch } from "../store";
import Loader from "./ui/Loader";
import ErrorCard from "./ui/ErrorCard";
import ErrorMsg from "./ui/ErrorMsg";

const UsersList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isLoading, data, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
      <div>{RenderedUsers}</div>
    </div>
  );
};

export default UsersList;
