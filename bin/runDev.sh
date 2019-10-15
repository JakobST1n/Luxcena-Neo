#!/bin/sh

sigint_handler()
{
    echo "Exiting all..."
    kill $WEBPACKPID
    kill $NODEPID
    exit
}

startNode()
{
    printf "%s\n" "> node app.js"
    node app.js "${APPDIR}" &
    NODEPID=$!

    printf "\n%s\n" "> WATCHING FILES..."
}

reloadNode()
{
    printf "\n%s\n" "> File changed, reloading node..."
    kill $NODEPID
    startNode
    mkdocs build
}

trap sigint_handler SIGINT

#command -v fswatch

APPDIR="${PWD}/tmp/"
if [ "$#" -gt "1" ]; then
    APPDIR=$1
else
    mkdir -p tmp
    mkdir -p tmp/userdata
    mkdir -p tmp/logs
fi

startNode

printf "%s\n" "> webpack"
npx webpack -p -w --mode=development &
WEBPACKPID=$!

while true
do
    #fswatch -t -o -r "${PWD}" | xargs -n1 -I{} reloadNode
    sleep 5
    fswatch --one-event -t -r "${PWD}"
    reloadNode
    sleep 4
done
sigint_handler
