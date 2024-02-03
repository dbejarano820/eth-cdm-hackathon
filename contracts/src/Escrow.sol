// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IPriceOracle} from "@aave/core-v3/contracts/interfaces/IPriceOracle.sol";

library Balances {
    function move(mapping(address => uint256) storage balances, address from, address to, uint amount) internal {
        require(balances[from] >= amount);
        require(balances[to] + amount >= balances[to]);
        balances[from] -= amount;
        balances[to] += amount;
    }
}

contract Escrow is Initializable, OwnableUpgradeable {
    string constant COMPLETE = "complete";
    string constant INCOMPLETE = "incomplete";

    struct Order {
        address _merchant;
        uint256 _amount;
        string _status;
        uint256 _tx;
    }

    event CollateralDeposit(address indexed sender, uint amount, address indexed token);
    event Withdrawal(address indexed receiver, uint amount);
    event OrderUpdate(uint256 indexed orderId, Order order);
    event Withdraw(address client, uint256 amount);
    event Received(address, uint);

    mapping(address => uint256) _balances;
    mapping(uint256 => Order) _orders;
    address _nativeToken;
    // https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
    address _aavePoolProxy;

    constructor() {
        _disableInitializers();
    }

    function initialize(address nativeToken, address aavePoolProxy) public initializer { 
        __Ownable_init(msg.sender);
        _nativeToken = nativeToken;
        _aavePoolProxy = aavePoolProxy;
    }

    function validate(address merchant, uint256 orderId, uint256 transaction, uint256 orderAmount) external onlyOwner {
        string memory orderStatus;
        if (msg.value == orderAmount) {
            orderStatus = COMPLETE;
        } else {
            orderStatus = INCOMPLETE;
        }

        _balances[merchant] += msg.value;

        Order memory newOrder = Order({
            _merchant: merchant,
            _amount: msg.value,
            _status: orderStatus,
            _tx: transaction
        });
        _orders[orderId] = newOrder;

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

    function getOrder(uint256 orderId) external view returns (Order memory) {
        return _orders[orderId];
    }

    function getOwner() external view returns (address) {
        return owner();
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
