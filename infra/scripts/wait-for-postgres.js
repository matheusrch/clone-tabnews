const { exec } = require("node:child_process");

const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

const messageWaiting = "Waiting for Postgres";
const messageReady = "Postgres is ready to accept connections!";

const startedAt = Date.now();

function showElapsedTime() {
  return `${((Date.now() - startedAt) / 1000).toFixed(2)}s`;
}

function showSpinner() {
  const intervalToUpdateMs = 100;
  const spinner = ["⠋", "⠙", "⠸", "⠼", "⠦", "⠧", "⠇", "⠏"];
  const index = Math.floor(Date.now() / intervalToUpdateMs) % spinner.length;
  return `${YELLOW} ${spinner[index]}${RESET}`;
}

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(
        `\r${showSpinner()} ${messageWaiting} (${showElapsedTime()})`,
      );
      checkPostgres();
      return;
    }

    process.stdout.write(
      `\r${GREEN} ✔${RESET} ${messageReady} (${showElapsedTime()})\n`,
    );
  }
}

checkPostgres();
