use anyhow::Context;
use duct::cmd;
use serde::Serialize;
use shlex::split;
use shlex::try_join;

#[derive(Debug, Serialize)]
pub struct CommandOutput {
    pub lines: String,
    pub returncode: i32,
}

pub fn check_output(command_string: &str, redirect_stderr: bool) -> anyhow::Result<CommandOutput> {
    let x = split(command_string).context("Failed to split command string")?;

    if x.is_empty() {
        return Err(anyhow::anyhow!("Command string is empty after splitting"));
    }

    let program = &x[0];
    let args = &x[1..];

    let mut cmd_builder = cmd(program, args).stdout_capture().unchecked();
    if redirect_stderr {
        cmd_builder = cmd_builder.stderr_to_stdout();
    }
    let result = cmd_builder.run().context("Failed to run shell command")?;

    Ok(CommandOutput {
        lines: String::from_utf8_lossy(&result.stdout).into(),
        returncode: result.status.code().unwrap_or(0),
    })
}

pub fn check_output_from_parts(
    command_parts: Vec<&str>,
    redirect_stderr: bool,
) -> anyhow::Result<CommandOutput> {
    let command_string = try_join(command_parts)?;
    check_output(command_string.as_str(), redirect_stderr)
}
