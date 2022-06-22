<script lang="ts">
    //  import { defaultEvmStores, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3'
    export let connected: boolean;
    
	const subContractAbi = [
		{
			constant: true,
			inputs: [],
			name: 'name',
			outputs: [
				{
					name: '',
					type: 'string'
				}
			],
			payable: false,
			stateMutability: 'view',
			type: 'function'
		},
		{
			constant: false,
			inputs: [
				{
					name: '_spender',
					type: 'address'
				},
				{
					name: '_value',
					type: 'uint256'
				}
			],
			name: 'approve',
			outputs: [
				{
					name: '',
					type: 'bool'
				}
			],
			payable: false,
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			constant: true,
			inputs: [],
			name: 'totalSupply',
			outputs: [
				{
					name: '',
					type: 'uint256'
				}
			],
			payable: false,
			stateMutability: 'view',
			type: 'function'
		},
		{
			constant: false,
			inputs: [
				{
					name: '_from',
					type: 'address'
				},
				{
					name: '_to',
					type: 'address'
				},
				{
					name: '_value',
					type: 'uint256'
				}
			],
			name: 'transferFrom',
			outputs: [
				{
					name: '',
					type: 'bool'
				}
			],
			payable: false,
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			constant: true,
			inputs: [],
			name: 'decimals',
			outputs: [
				{
					name: '',
					type: 'uint8'
				}
			],
			payable: false,
			stateMutability: 'view',
			type: 'function'
		},
		{
			constant: true,
			inputs: [
				{
					name: '_owner',
					type: 'address'
				}
			],
			name: 'balanceOf',
			outputs: [
				{
					name: 'balance',
					type: 'uint256'
				}
			],
			payable: false,
			stateMutability: 'view',
			type: 'function'
		},
		{
			constant: true,
			inputs: [],
			name: 'symbol',
			outputs: [
				{
					name: '',
					type: 'string'
				}
			],
			payable: false,
			stateMutability: 'view',
			type: 'function'
		},
		{
			constant: false,
			inputs: [
				{
					name: '_to',
					type: 'address'
				},
				{
					name: '_value',
					type: 'uint256'
				}
			],
			name: 'transfer',
			outputs: [
				{
					name: '',
					type: 'bool'
				}
			],
			payable: false,
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			constant: true,
			inputs: [
				{
					name: '_owner',
					type: 'address'
				},
				{
					name: '_spender',
					type: 'address'
				}
			],
			name: 'allowance',
			outputs: [
				{
					name: '',
					type: 'uint256'
				}
			],
			payable: false,
			stateMutability: 'view',
			type: 'function'
		},
		{
			payable: true,
			stateMutability: 'payable',
			type: 'fallback'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					name: 'owner',
					type: 'address'
				},
				{
					indexed: true,
					name: 'spender',
					type: 'address'
				},
				{
					indexed: false,
					name: 'value',
					type: 'uint256'
				}
			],
			name: 'Approval',
			type: 'event'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					name: 'from',
					type: 'address'
				},
				{
					indexed: true,
					name: 'to',
					type: 'address'
				},
				{
					indexed: false,
					name: 'value',
					type: 'uint256'
				}
			],
			name: 'Transfer',
			type: 'event'
		}
	];
    const nltContract = "0x9719459eBe4C381B361AeAC1C29D1554B6A12F6e"
    const connectWallet = async () => {
		const accounts = await window.ethereum
			.request({
				method: 'eth_requestAccounts'
			})
			.catch((err) => {
				console.log(err.code);
			});
            const account = accounts[0];
            console.log(accounts);
            connected = Boolean(account);
            // const web3 = new Web3(window.ethereum);
            // var account = await web3.eth.getAccounts();
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // let subContract = new ethers.Contract(nltContract, subContractAbi, provider);
		    // let mintedNFT = await subContract.mint(account);
        
	};
</script>

<section class="flex items-center justify-center h-screen w-screen">
    <button
        on:click={connectWallet}
        class="bg-red-100  px-10 py-2  text-red-900 font-bold rounded-full"
        >
        Connect
    </button>
</section>