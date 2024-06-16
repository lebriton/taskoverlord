<div align="center">

![](src-tauri/icons/Square150x150Logo.png)

# Taskoverlord

**Modern desktop client for Taskwarrior.**

![GitHub last commit](https://img.shields.io/github/last-commit/lebriton/taskoverlord)
![GitHub Issues](https://img.shields.io/github/issues-raw/lebriton/taskoverlord?label=open%20issues)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/lebriton/taskoverlord?label=open%20pull%20requests)

_Taskoverlord is currently only available for Linux.<br :>Windows and Mac builds may come in the future._

</div>

> [!WARNING]  
> This project is currently in alpha stage, meaning it's under active development and may contain bugs.  
> Please use with caution and report any issues you encounter.

## ✨ Features

- Supports **Taskwarrior x.x.x+**
- 100% **free** and **open source** under the [GPLv3 license](/LICENSE).
- Run the desktop client seamlessly on any Linux distribution thanks to the **AppImage** technology, and a dedicated **Debian package** for Debian-based systems.
- Enjoy a seamless user experience with a focus on **keyboard-driven interactions**, although mouse usage is also supported for familiarity.
  - Utilize **intuitive shortcuts** to swiftly maneuver through the application and perform various actions.
  - Navigate effortlessly with familiar **Vim-like keybindings**.

## 🗺️ Roadmap

To stay updated with TaskOverlord's latest developments, planned features, and progress, visit the [GitHub project page](https://github.com/users/lebriton/projects/4/views/4). Your feedback and contributions are highly appreciated.

## 📦 Install

## 📖 Documentation

## 👩‍💻 Contributing

<details>
<summary>Setup</summary>

With [rust](https://www.rust-lang.org/tools/install), [pnpm](https://pnpm.io/installation) and [just](https://just.systems/man/en/chapter_2.html) installed, run `just setup`.

</details>

<details>
<summary>Develop</summary>

To launch the app in development mode, run `just develop`.

Before committing any changes to git, run `just pre-commit`.  
Alternatively, you can opt to automate the prior command's execution by installing a git hook with `just install-pre-commit-hook`.

</details>

<details>
<summary>Build</summary>

[wip (github action)](https://tauri.app/v1/guides/building/linux/)

</details>

## 📜 License

Taskoverlord is released under the GPLv3 license.
For details check the [LICENSE](LICENSE) file.
