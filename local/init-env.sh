#!/usr/bin/env bash
sample_env_file='.env.sample'
env_file='.env'

if [[ -f ${env_file} && -f "../${env_file}" ]]; then
  sample_env_cksum=$(cksum ${sample_env_file} | awk '{print $1}')
  env_cksum=$(cksum ${env_file} | awk '{print $1}')

  if [[ ${sample_env_cksum} != ${env_cksum} ]]; then
    echo -n "WARNING: "
    echo "Your .env and .env.sample files are different, please check if there is any new env var added to samples"
  fi
else
  echo -n "Creating env file from samples... "
  yes | cp ${sample_env_file} ${env_file}
  echo  "done"

  echo -n "Linking root env file to local env file... "
  ln -s "$(pwd)/${env_file}" ../${env_file}
  echo "done"
fi

echo "Environment: done"
