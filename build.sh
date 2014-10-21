#!/usr/bin/env bash

# exit when script tries to use an undeclared variable
set -o nounset

die() {
    echo "$*"
    exit 1
}


main () {
    tsc ./typescript/App.ts --out ./static/js/app.js
}

main "$@"

