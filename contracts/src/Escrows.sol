// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IPriceOracle} from "@aave/core-v3/contracts/interfaces/IPriceOracle.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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
    uint256 constant LIMIT_DEPOSIT_DAYS = 432000; // 5 days
    uint256 constant MINIMUN_TOKEN_AMOUNT = 5000; 

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
    uint256 _latestSupplyTime;
    address _usdcToken;
    // https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
    address _aavePoolProxy;
    
    // aUSDC token 0xb1c85310a1b809C70fA6806d27Da425C1261F801
    // USDC token 0xCaC7Ffa82c0f43EBB0FC11FCd32123EcA46626cf

    constructor() {
        // __Ownable_init(msg.sender);
        _latestSupplyTime = block.timestamp;
        _usdcToken = 0xCaC7Ffa82c0f43EBB0FC11FCd32123EcA46626cf;
        _aavePoolProxy = 0xccEa5C65f6d4F465B71501418b88FBe4e7071283;
    }

    function initialize() public initializer {}
    
    // TODO: add onlyOwner
    function validate(address merchant, uint256 orderId, uint256 transaction, uint256 orderAmount, string memory orderStatus) external {
        _balances[merchant] += orderAmount;

        Order memory newOrder = Order({
            _merchant: merchant,
            _amount: orderAmount,
            _status: orderStatus,
            _tx: transaction
        });

        _orders[orderId] = newOrder;
        emit OrderUpdate(orderId, newOrder);

        uint256 USDCEscrowBalance = IERC20(_usdcToken).balanceOf(address(this));
        // if (USDCEscrowBalance != 0) {
        IERC20(_usdcToken).approve(_aavePoolProxy, USDCEscrowBalance);
        IPool(_aavePoolProxy).supply(_usdcToken, USDCEscrowBalance, address(this), 0);
        // }
        emit CollateralDeposit(address(this), USDCEscrowBalance, _usdcToken);
    }

    function withdraw(address merchant) external onlyOwner {
        require(_balances[merchant] > 0, "Merchant balance is zero");
        
        uint256 amountToWithdraw = _balances[merchant];
        _balances[merchant] = 0;
        IERC20(_usdcToken).transfer(merchant, amountToWithdraw);

        emit Withdraw(merchant, amountToWithdraw);
    }

    function balanceOf(address tokenOwner) external view returns (uint balance) {
        return _balances[tokenOwner];
    }

    function getOrder(uint256 orderId) external view returns (Order memory) {
        return _orders[orderId];
    }

    function getUSDC() external view returns (address) {
        return _usdcToken;
    }

    function getAave() external view returns (address) {
        return _aavePoolProxy;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
