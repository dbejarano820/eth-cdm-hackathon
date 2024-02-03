deps:
	@ cd ./contracts/ && forge install foundry-rs/forge-std @aave/core-v3 OpenZeppelin/openzeppelin-contracts-upgradeable

install-ethereum-foundry:
	curl -L https://foundry.paradigm.xyz | bash && foundryup

clean:
	@cd ./contracts/ && forge clean

build: clean
	@cd ./contracts/ && forge build

test: clean
	@cd ./contracts/ && forge test

deploy: build
	@. ./contracts/.env && . ./contracts/deploy.sh
