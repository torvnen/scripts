const exec = require("child_process").exec;

const cmd1 = "where sqllocaldb";
exec(cmd1, (e, so, se) => {
  const cmd2 = `\"${so.trim("\r")}\" info`;
  exec(cmd2, (e2, so2, se2) => {
    const cmd3 = `${cmd2} ${so2}`.trim("\r");
    exec(cmd3, (e3, so3, se3) => {
      console.log(so3);
    });
  });
});
