import { NextResponse } from "next/server";
import debugConsole from "./debugger";

export const throwUserResponse = ({
  status,
  statusText,
  success,
  message = "Sorry an error occured",
  errorStack,
  data,
}) => {
  if (errorStack) debugConsole(errorStack);
  return NextResponse.json(
    {
      success,
      message,
      error: errorStack,
      data,
    },
    { status, statusText }
  );
};
