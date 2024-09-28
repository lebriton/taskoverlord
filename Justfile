alias dev := develop

build *args='':
    pnpm tauri build {{args}}

# for convenience
cargo *args='':
    cd src-tauri && cargo {{args}}

develop:
    pnpm tauri dev

pre-commit:
    cd src-tauri && cargo clippy -- -Dwarnings
    cd src-tauri && cargo fmt --all
    pnpm exec prettier . --write

setup:
    pnpm install
