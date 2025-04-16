const { DEBUG } = process.env;

function debugConsole(...args) {
  if (DEBUG) {
    console.log(...args);
  }
}

export default debugConsole;
