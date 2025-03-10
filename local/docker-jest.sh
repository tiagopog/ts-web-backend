test_case=${1}
project_root=$(pwd)
file_path=$(echo ${2} | sed "s|${project_root}/||")

echo "Test case: ${test_case}"
echo "Test file path: ${file_path}"

cd local

docker-compose run --rm backend \
    npx jest \
    -c 'src/tests/jest.config.js'
    -t ${test_case} ${file_path}

cd ..
