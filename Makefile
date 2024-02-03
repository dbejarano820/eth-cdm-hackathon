deps:
	@ cd ./contracts/ && npm install @openzeppelin/contracts-upgradeable @aave/core-v3 && forge install foundry-rs/forge-std

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
