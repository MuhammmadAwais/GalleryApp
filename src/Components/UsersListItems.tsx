
import React from "react";
import { GoTrash } from "react-icons/go";
import Button from "./ui/Button";
import { removeUser } from "../store";
import { useThunk } from "./hooks/useThunk";
import ErrorMsg from "./ui/ErrorMsg";
import Spinner from "./ui/Spinner";

const UsersListItems: React.FC<{ user: { id: number; name: string } | null }> = React.memo(({ user }) => {

  const [runRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = React.useCallback(() => user ? runRemoveUser(user) : null, [user, runRemoveUser]);


  return (
    <div>
      {user && (
        <div className="mb-2 rounded border">
          <div className="flex p-2 justify-between items-center cursor-pointer">
            {user.name}
            <div className="flex items-center gap-4">
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="flex items-center">
                  {error && !isLoading && (
                    <div className="mr-4">
                      <ErrorMsg message={error.message} key={Date.now() + Math.random()} />
                    </div>
                  )}
                  <Button
                    variant="danger"
                    onClick={handleClick}
                    disabled={!user || isLoading}
                  >
                    <GoTrash />
                  </Button>

                </div>
              )}
            </div>

          </div>
        </div>
      )}


    </div>
  );
});


export default UsersListItems;

