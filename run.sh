#!/usr/bin/env bash

websocketd_dir=websocketd_mac
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

${websocketd_dir}/websocketd --port=8080 --staticdir="${DIR}" ${DIR}/bin/navik
