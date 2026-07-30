#!/usr/bin/env bash
set -euo pipefail

PREFIX="⟫"
# PREFIX="▶"
COLOR_RESET='\033[0m'

onexit() {
    status=$?
    if [ "$status" -ne 0 ]; then
        echo
        printf $PREFIX' \033[1;38;2;255;255;255;48;2;220;38;38m ✕ '$COLOR_RESET' Lint failed.\n' >&2
    fi
    exit "$status"
}

trap onexit EXIT

timer_start() {
    date +%s%N
}

COLOR_ORANGE='\033[38;2;217;119;6m'
timer_end() {
    start=$1
    end=$(date +%s%N)

    ms=$(((end - start) / 1000000))

    if [ "$ms" -lt 1000 ]; then
        printf '%s%d%sms' "$COLOR_ORANGE" "$ms" "$COLOR_RESET"
    elif [ "$ms" -lt 10000 ]; then
        printf '%s%d.%02d%ss' \
            "$COLOR_ORANGE" $((ms / 1000)) $(((ms % 1000) / 10)) "$COLOR_RESET"
    elif [ "$ms" -lt 100000 ]; then
        printf '%s%d.%01d%ss' \
            "$COLOR_ORANGE" $((ms / 1000)) $(((ms % 1000) / 100)) "$COLOR_RESET"
    elif [ "$ms" -lt 60000 ]; then
        printf '%s%d%ss' "$COLOR_ORANGE" $((ms / 1000)) "$COLOR_RESET"
    else
        min=$((ms / 60000))
        sec=$(((ms / 1000) % 60))

        if [ "$min" -lt 30 ]; then
            printf '%s%d%sm %s%02d%ss' \
                "$COLOR_ORANGE" "$min" "$COLOR_RESET" \
                "$COLOR_ORANGE" "$sec" "$COLOR_RESET"
        else
            printf '%s%d%sm' "$COLOR_ORANGE" "$min" "$COLOR_RESET"
        fi
    fi
}

start_all=$(timer_start)

COLOR_BIOME='96;165;250'
printf $PREFIX' \033[1;38;2;0;0;0;48;2;'$COLOR_BIOME'm Biome '$COLOR_RESET'\n'
start_tool=$(timer_start)
npx biome format
time_biome=$(timer_end "$start_tool")
echo

COLOR_OXLINT='50;243;233'
printf $PREFIX' \033[1;38;2;0;0;0;48;2;'$COLOR_OXLINT'm Oxlint '$COLOR_RESET'\n'
start_tool=$(timer_start)
npx oxlint
time_oxlint=$(timer_end "$start_tool")
echo

COLOR_ESLINT='57;32;176'
printf $PREFIX' \033[1;38;2;255;255;255;48;2;'$COLOR_ESLINT'm ESLint '$COLOR_RESET'\n'
start_tool=$(timer_start)
npx eslint .
time_eslint=$(timer_end "$start_tool")
echo

COLOR_TYPESCRIPT='49;120;198'
printf $PREFIX' \033[1;38;2;255;255;255;48;2;'$COLOR_TYPESCRIPT'm TypeScript '$COLOR_RESET''
start_tool=$(timer_start)
if npm ls vue-tsc --depth=0 >/dev/null 2>&1; then
    printf ' + \033[1;38;2;255;255;255;48;2;66;208;144m Vue '$COLOR_RESET'\n'
    npx vue-tsc
else
    echo
    npx tsc
fi
time_typescript=$(timer_end "$start_tool")
echo

printf $PREFIX' \033[1;38;2;255;255;255;48;2;22;163;74m ✓ '$COLOR_RESET' Lint succeeded!\n'
echo

SYMBOL_CIRCLE='●'
printf $PREFIX' Lint time     '$(timer_end "$start_all")'\n'
printf '  \033[1;38;2;'$COLOR_BIOME'm'$SYMBOL_CIRCLE$COLOR_RESET' Biome       '$time_biome'\n'
printf '  \033[1;38;2;'$COLOR_OXLINT'm'$SYMBOL_CIRCLE$COLOR_RESET' Oxlint      '$time_oxlint'\n'
printf '  \033[1;38;2;'$COLOR_ESLINT'm'$SYMBOL_CIRCLE$COLOR_RESET' ESLint      '$time_eslint'\n'
printf '  \033[1;38;2;'$COLOR_TYPESCRIPT'm'$SYMBOL_CIRCLE$COLOR_RESET' TypeScript  '$time_typescript'\n'
