import { useEffect } from "react";
import { useDispatch   } from "react-redux";
import type { Dispatch } from "redux";

import { fetchUsers } from "../store/Thunks/fetchUsers";

const UsersList: React.FC = () => {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  return (
    <div>
      <h1>UsersList</h1>
    </div>
  );
};

export default UsersList;