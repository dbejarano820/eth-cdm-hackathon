import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { Order } from '../../../interfaces';
import { ethers, Wallet } from "ethers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const tx = searchParams.get('tx');
    
    try {

        // traer orden de la bd
        const result = await sql`SELECT * from Orders WHERE id = ${orderId};`;
        const order = result.rows[0] as Order;

        // traer la tx via API
        const params = {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "eth_getTransactionByHash",
            "params": [`${tx}`]
        };
        let detailTx = await axios.post(process.env.RPC_URL as string, params);
        
        // Obtener el amount
        const decimalValue = BigInt(`0x${detailTx.data.result.input.substring(75)}`).toString();
        const amountTx = parseInt(decimalValue.slice(0, -18));

        // Comparar montos
        let status = 'Completed'; 
        const newBalance = amountTx + order.payed_amount;
        if (newBalance < order.amount) {
            status = 'Incomplete';
        }

        // actualizar orden a (incomplete o completed)
        await sql`UPDATE Orders SET transaction_hash = ${tx}, payed_amount = ${newBalance}, order_status = ${status} WHERE id = ${orderId};`;

        // pegarle al contrato escrow
        const ABI = [
            {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
            },
            {
            "inputs": [],
            "name": "InvalidInitialization",
            "type": "error"
            },
            {
            "inputs": [],
            "name": "NotInitializing",
            "type": "error"
            },
            {
            "inputs": [
                {
                "internalType": "address",
                "name": "owner",
                "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
            },
            {
            "inputs": [
                {
                "internalType": "address",
                "name": "account",
                "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
            },
            {
            "anonymous": false,
            "inputs": [
                {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
                },
                {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
                },
                {
                "indexed": true,
                "internalType": "address",
                "name": "token",
                "type": "address"
                }
            ],
            "name": "CollateralDeposit",
            "type": "event"
            },
            {
            "anonymous": false,
            "inputs": [
                {
                "indexed": false,
                "internalType": "uint64",
                "name": "version",
                "type": "uint64"
                }
            ],
            "name": "Initialized",
            "type": "event"
            },
            {
            "anonymous": false,
            "inputs": [
                {
                "indexed": true,
                "internalType": "uint256",
                "name": "orderId",
                "type": "uint256"
                },
                {
                "components": [
                    {
                    "internalType": "address",
                    "name": "_merchant",
                    "type": "address"
                    },
                    {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                    },
                    {
                    "internalType": "string",
                    "name": "_status",
                    "type": "string"
                    },
                    {
                    "internalType": "uint256",
                    "name": "_tx",
                    "type": "uint256"
                    }
                ],
                "indexed": false,
                "internalType": "struct Escrow.Order",
                "name": "order",
                "type": "tuple"
                }
            ],
            "name": "OrderUpdate",
            "type": "event"
            },
            {
            "anonymous": false,
            "inputs": [
                {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
                },
                {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
            },
            {
            "anonymous": false,
            "inputs": [
                {
                "indexed": false,
                "internalType": "address",
                "name": "",
                "type": "address"
                },
                {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
                }
            ],
            "name": "Received",
            "type": "event"
            },
            {
            "anonymous": false,
            "inputs": [
                {
                "indexed": false,
                "internalType": "address",
                "name": "client",
                "type": "address"
                },
                {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
                }
            ],
            "name": "Withdraw",
            "type": "event"
            },
            {
            "anonymous": false,
            "inputs": [
                {
                "indexed": true,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
                },
                {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
                }
            ],
            "name": "Withdrawal",
            "type": "event"
            },
            {
            "inputs": [
                {
                "internalType": "address",
                "name": "tokenOwner",
                "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
            },
            {
            "inputs": [
                {
                "internalType": "uint256",
                "name": "orderId",
                "type": "uint256"
                }
            ],
            "name": "getOrder",
            "outputs": [
                {
                "components": [
                    {
                    "internalType": "address",
                    "name": "_merchant",
                    "type": "address"
                    },
                    {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                    },
                    {
                    "internalType": "string",
                    "name": "_status",
                    "type": "string"
                    },
                    {
                    "internalType": "uint256",
                    "name": "_tx",
                    "type": "uint256"
                    }
                ],
                "internalType": "struct Escrow.Order",
                "name": "",
                "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
            },
            {
            "inputs": [],
            "name": "getOwner",
            "outputs": [
                {
                "internalType": "address",
                "name": "",
                "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
            },
            {
            "inputs": [
                {
                "internalType": "address",
                "name": "nativeToken",
                "type": "address"
                },
                {
                "internalType": "address",
                "name": "aavePoolProxy",
                "type": "address"
                }
            ],
            "name": "initialize",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
            },
            {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                "internalType": "address",
                "name": "",
                "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
            },
            {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
            },
            {
            "inputs": [
                {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
            },
            {
            "inputs": [
                {
                "internalType": "address",
                "name": "merchant",
                "type": "address"
                },
                {
                "internalType": "uint256",
                "name": "orderId",
                "type": "uint256"
                },
                {
                "internalType": "uint256",
                "name": "transaction",
                "type": "uint256"
                },
                {
                "internalType": "uint256",
                "name": "orderAmount",
                "type": "uint256"
                },
                {
                "internalType": "string",
                "name": "orderStatus",
                "type": "string"
                }
            ],
            "name": "validate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
            },
            {
            "inputs": [
                {
                "internalType": "address",
                "name": "merchant",
                "type": "address"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
            },
            {
            "stateMutability": "payable",
            "type": "receive"
            }
        ];

        const provider = new ethers.providers.WebSocketProvider("wss://api.avax-test.network/ext/bc/C/ws");

        const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);
        const contract = new ethers.Contract(process.env.ESCROW_CONTRACT!, ABI, provider);

        const contractWithWallet = contract.connect(wallet);
        // TODO: update user wallet
        const resultTx = await contractWithWallet.validate('0xEBdf70B26e5e7520B8B79e1D01eD832f48972B09', orderId, tx, order.amount, status);
        await resultTx.wait();

    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ status: 200 });
}
