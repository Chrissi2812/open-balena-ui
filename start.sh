#!/bin/bash

env | grep 'REACT_APP_OPEN_BALENA_' | sed 's/ //g; s/^/window./' > balenaConf.js

/thttpd -D -h 0.0.0.0 -p 3000 -d /home/static -u static -l - -M 60
