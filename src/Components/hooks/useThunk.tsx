import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import type { SerializedError } from "../../Types/errorTypes";

import type { AsyncThunk } from "@reduxjs/toolkit";

type ErrorType = SerializedError | null;

type AnyAsyncThunk = AsyncThunk<any, any, any>;


export const useThunk = (thunk: AnyAsyncThunk) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

 
  const dispatch = useDispatch<any>();

  const runThunk = useCallback(
    (arg?: any) => {
 
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err: SerializedError) => setError(err))
        .then(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );


  return [runThunk, isLoading, error] as const;
};
