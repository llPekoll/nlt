import Mp from './Marketplace.json';
import MpTest from './MarketplaceTestnet.json';
export const debugMode = true;
export const withdrawl = false;
export const chainId = debugMode ? '0x61' : '0x38';
export const marketplace = debugMode ? MpTest : Mp;
