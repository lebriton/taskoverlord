use anyhow::anyhow;
use std::process::Command;

pub fn check_output(command: &mut Command) -> anyhow::Result<String> {
    let output = command.output()?;
    if !output.status.success() {
        return Err(anyhow!("shell command failed: {:?}", command));
    }
    let output_string = String::from_utf8(output.stdout)?;
    Ok(output_string)
}
