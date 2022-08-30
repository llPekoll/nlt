import Mp from './Marketplace.json';
import MpTest from './MarketplaceTestnet.json';

export const env = import.meta.env;
export const debugMode = env.VITE_STATE == 'DEV';
console.log(`========== Debug Mode [${debugMode}]===========`)

export const withdrawl = false;
export const chainId = debugMode ? '0x61' : '0x38';
export const marketplace = debugMode ? MpTest : Mp;
