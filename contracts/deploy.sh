#!/bin/bash

# ANSI format
GREEN='\e[32m'
COLOR_RESET='\033[0m'

cd contracts/solidity

printf "${GREEN}\n=> [ETH] Deploying Escrow ${COLOR_RESET}\n"

RESULT_LOG=$(forge script ./script/Escrow.s.sol --rpc-url $ETH_RPC_URL --broadcast --verify)
# echo "$RESULT_LOG" #uncomment this line for debugging in detail

# Getting result addresses
ESCROW_ADDRESS=$(echo "$RESULT_LOG" | grep -Eo '0: address ([^\n]+)' | awk '{print $NF}')

printf "${GREEN}\n=> [ETH] Deployed Escrow address: $ESCROW_ADDRESS ${COLOR_RESET}\n"

cd ../.. #to reset working directory
