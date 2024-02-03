// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

library Balances {
    function move(mapping(address => uint256) storage balances, address from, address to, uint amount) internal {
        require(balances[from] >= amount);
        require(balances[to] + amount >= balances[to]);
        balances[from] -= amount;
        balances[to] += amount;
    }
}

contract Escrow is Initializable, OwnableUpgradeable {
    string public constant COMPLETE = "complete";
    string public constant INCOMPLETE = "incomplete";

    struct Order {
        address _merchant;
        uint256 _amount;
        string _status;
        uint256 _tx;
    }

    event OrderUpdate(uint256 indexed orderId, Order order);
    event Withdraw(address client, uint256 amount);

    mapping(address => uint256) public _balances;
    mapping(uint256 => Order) public _orders;
    address _nativeToken;

    constructor() {
        _disableInitializers();
    }

    function initialize(address nativeToken) public initializer { 
        __Ownable_init(msg.sender);
        _nativeToken = nativeToken;
    }

    function validate(address merchant, uint256 orderId, uint256 transaction, uint256 orderAmount) external payable onlyOwner {
        require(msg.value == orderAmount, "Invalid amount sent for validation");

        // Set order status based on the amount received
        string memory orderStatus;
        if (msg.value == orderAmount) {
            orderStatus = COMPLETE;
        } else {
            orderStatus = INCOMPLETE;
        }

        // Update merchant balance
        _balances[merchant] += msg.value;

        // Create and store the order
        Order memory newOrder = Order({
            _merchant: merchant,
            _amount: msg.value,
            _status: orderStatus,
            _tx: transaction
        });
        _orders[orderId] = newOrder;

        // Emit OrderUpdate event
        emit OrderUpdate(orderId, newOrder);
    }

    function withdraw(address merchant) external payable onlyOwner {
        require(_balances[merchant] > 0, "Merchant balance is zero");
        
        uint256 amountToWithdraw = _balances[merchant];
        _balances[merchant] = 0; 
        IERC20(_nativeToken).transfer(merchant, amountToWithdraw);

        emit Withdraw(merchant, amountToWithdraw);
    }

    function balanceOf(address tokenOwner) external view returns (uint balance) {
        return _balances[tokenOwner];
    }

    function getOwner() external view returns (address) {
        return owner();
    }
}
