export const ApiStatus = {
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

export const isFulfilled = (response) => {
  if (response.meta?.requestStatus === "fulfilled") return true;
  return false;
};
