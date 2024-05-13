alias dev := develop

build:
    pnpm tauri build

pre-commit:
    cd src-tauri && cargo clippy
    cd src-tauri && cargo fmt
    pnpm exec prettier . --write

install-pre-commit-hook:
    echo "just pre-commit" > .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

develop:
    pnpm tauri dev

setup:
    pnpm install

# for convenience
cargo *args='':
    cd src-tauri && cargo {{args}}
