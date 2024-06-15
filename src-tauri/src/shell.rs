use duct::cmd;
use serde::Serialize;
use shlex::split;
use shlex::try_join;

#[derive(Debug, Serialize)]
pub struct ShellOutput {
    pub lines: String,
    pub returncode: i32,
}

pub fn check_output(command_string: &str, redirect_stderr: bool) -> anyhow::Result<ShellOutput> {
    let x = split(command_string).unwrap();

    let program = &x[0];
    let args = &x[1..];

    let mut cmd_builder = cmd(program, args).stdout_capture().unchecked();
    if redirect_stderr {
        cmd_builder = cmd_builder.stderr_to_stdout();
    }
    let result = cmd_builder.run()?;

    Ok(ShellOutput {
        lines: String::from_utf8_lossy(&result.stdout).into(),
        returncode: result.status.code().unwrap_or(0),
    })
}

pub fn check_output2(
    command_parts: Vec<&str>,
    redirect_stderr: bool,
) -> anyhow::Result<ShellOutput> {
    let command_string = try_join(command_parts)?;
    check_output(command_string.as_str(), redirect_stderr)
}
