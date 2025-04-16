import { throwUserResponse } from "@/utils";
import debugConsole from "@/utils/debugger";

/**
 * Checks if the specified keys exist in the request object and their values are not undefined, null, or empty.
 * @param obj - The request object to check. It can be any object that matches the type T.
 * @param keys - An array of strings, which are the keys to check in the object.
 * @returns If all keys pass the check, it calls the next middleware in the pipeline.
 *          If any key fails the check, it returns a JSON response with an error message and a 400 status code.
 */
function requiredReqBodyCheck(obj, keys) {
  try {
    const failedKeys = [];

    const status = keys.every((key) => {
      if (key in obj && !!obj[key]) {
        return true;
      }
      failedKeys.push(key);
      return false;
    });

    if (!status) {
      const errorMsg = `${failedKeys.join(
        ","
      )} is either not passed or wrong data type was passed`;
      // throw new Error(errorMsg);
      return throwUserResponse({
        status: 400,
        success: status,
        message: errorMsg,
      });
    }

    return throwUserResponse({
      status: 200,
      success: status,
      message: "Success",
    });
  } catch (error) {
    debugConsole(error);
    return throwUserResponse({
      status: 400,
      success: false,
      message: error.message,
      errorStack: error,
    });
  }
}

export default requiredReqBodyCheck;
