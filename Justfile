alias dev := develop

build:
    pnpm tauri build

pre-commit:
    cd src-tauri && cargo clippy
    cd src-tauri && cargo fmt
    pnpm exec prettier . --write

develop:
    pnpm tauri dev

setup:
    pnpm install

# for convenience
cargo *args='':
    cd src-tauri && cargo {{args}}
