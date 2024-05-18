use duct::cmd;
use serde::Serialize;
use shlex::split;

#[derive(Debug, Serialize)]
pub struct ShellOutput {
    pub lines: String,
    pub returncode: i32,
}

pub fn check_output(command_string: &str) -> anyhow::Result<ShellOutput> {
    let x = split(command_string).unwrap();

    let program = &x[0];
    let args = &x[1..];

    let result = cmd(program, args)
        .stderr_to_stdout()
        .stdout_capture()
        .unchecked()
        .run()?;

    Ok(ShellOutput {
        lines: String::from_utf8_lossy(&result.stdout).into(),
        returncode: result.status.code().unwrap_or(0),
    })
}
