#!/bin/bash

echo "argument: $1"

if [ "$1" != "" ]; then
    echo "Not empty"
    curl -X POST -u "apikey:$2" \
    --header "Content-Type: application/json" \
    --header "Accept: audio/ogg" \
    --data "{\"text\":\"$1\"}" \
    --output remindersss.ogg \
    "https://gateway-syd.watsonplatform.net/text-to-speech/api/v1/synthesize"
else 
    echo "No arguments"
fi

