#!/bin/bash

COUNTER=0
while [  $COUNTER -lt 10 ]; do
    curl localhost:3000
    let COUNTER=COUNTER+1
done