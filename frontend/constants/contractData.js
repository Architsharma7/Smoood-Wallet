export const recoveryModuleContractAddress =
  "0x2B74083B670009fA63e7CceC16A0400cc202f7c8";

export const recoveryModuleABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "safeAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "newOwnerWallet",
				"type": "address"
			}
		],
		"name": "recoverWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "safeAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "eoa",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "q1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "a1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "q2",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "a2",
				"type": "string"
			}
		],
		"name": "setRecoveryRecords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_recoveryManager",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "safeAddress",
				"type": "address"
			}
		],
		"name": "getRecoveryRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "q1",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "a1",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "q2",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "a2",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "eoa",
						"type": "address"
					}
				],
				"internalType": "struct RecoveryModule.RecoveryRecord",
				"name": "_record",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "records",
		"outputs": [
			{
				"internalType": "string",
				"name": "q1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "a1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "q2",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "a2",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "eoa",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recoveryManager",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]