// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.21;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Escrow is Initializable, OwnableUpgradeable {
    string public constant PENDING = "pending";
    string public constant COMPLETE = "complete";
    string public constant EXPIRED = "expired";
    string public constant INCOMPLETE = "incomplete";

    struct Order {
        address _client;
        uint256 _amount;
        string _status;
        address _tx;
    }

    struct TransferInfo {
        uint256 destAddress;
        uint256 amount;
        bool isUsed;
    }

    event Deposit(uint256 indexed orderId, address srcAddress, TransferInfo transferInfo);

    mapping(address => amount) public balance;

    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer { 
        __Ownable_init(msg.sender);
    }

    function deposit() external payable onlyOwnerOrMM {
    }

    function withdraw() external payable {
    }

    function getOwner() external view returns (address) {
        return owner();
    }
}
