#!/bin/bash
while read x; do
    if [[ "$x" != *.d.ts ]]; then
        echo "$x"
        tsc "$x" -w &
    fi
done < <(find . -type f -iname "*.ts")

wait

pkill -P $$
