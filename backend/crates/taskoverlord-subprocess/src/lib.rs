use std::process::{Command, Output};

pub trait CommandExt {
    fn redirect_stderr_to_stdout(&mut self) -> &mut Self;
}

impl CommandExt for Command {
    fn redirect_stderr_to_stdout(&mut self) -> &mut Self {
        self.stderr(std::process::Stdio::inherit());
        self
    }
}

pub trait OutputExt {
    fn utf8_lossy_stdout(&self) -> String;
    fn utf8_lossy_stderr(&self) -> String;
}

impl OutputExt for Output {
    fn utf8_lossy_stdout(&self) -> String {
        String::from_utf8_lossy(&self.stdout).to_string()
    }

    fn utf8_lossy_stderr(&self) -> String {
        String::from_utf8_lossy(&self.stderr).to_string()
    }
}
