import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/Thunks/fetchUsers";
import type { RootState, AppDispatch } from "../store"; 

const UsersList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isLoading, data, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if(isLoading) return <h1>Loading...</h1>
  if(error) return <h1>{error.message}</h1>

  return (
    <div>
      <h1>{data.length}</h1>
    </div>
  );
};

export default UsersList;
