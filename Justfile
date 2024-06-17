pre_commit_hook_script := """
#!/usr/bin/env bash

set -Eeuo pipefail

just pre-commit
git add -u

if git diff --cached --quiet; then
    echo "No changes to commit after formatting"
    exit 1
fi
"""

alias dev := develop

build *args='':
    pnpm tauri build {{args}}

# for convenience
cargo *args='':
    cd src-tauri && cargo {{args}}

develop:
    pnpm tauri dev

install-pre-commit-hook:
    echo '{{pre_commit_hook_script}}' > .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

pre-commit:
    cd src-tauri && cargo clippy -- -Dwarnings
    cd src-tauri && cargo fmt --all
    pnpm exec prettier . --write

    black bin/release --line-length 120

release:
    bin/release

setup:
    pnpm install
