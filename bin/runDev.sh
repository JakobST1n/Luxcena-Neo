printf "%s\n" "> webpack"
npx webpack

printf "%s\n" "> node app.js"
if [ "$#" -gt "1" ]; then
    node app.js $1
else
    mkdir -p tmp
    mkdir -p tmp/userdata
    mkdir -p tmp/logs
    node app.js "$PWD/tmp/"
fi
