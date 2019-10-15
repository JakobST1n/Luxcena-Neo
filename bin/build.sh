echo "> Install node modules needed for build"
NODE_ENV="development"
npm i

echo "> Make sure all python dependencies for build is installed"
pip3 install mkdocs mkdocs-gitbook pygments pymdown-extensions

echo "> Compile es6 and sass to bundles"
npx webpack -p

echo "> Generate html docs using sphinx"
mkdocs build
