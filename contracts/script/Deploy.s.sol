// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.21;

import {Script} from "forge-std/Script.sol";
import {Escrow} from "../src/Escrow.sol";

contract Deploy is Script {
    function run() external returns (address) {
        uint256 deployerPrivateKey = vm.envUint("ETH_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Escrow escrow = new Escrow();
        vm.stopBroadcast();
        return (address(escrow));
    }
}
