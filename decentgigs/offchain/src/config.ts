import { toUnit } from "@lucid-evolution/lucid";

// ===================================================================
// 🛑 CONFIGURATION - GANTI NILAI DI BAWAH INI
// ===================================================================

// Blockfrost Configuration (Preprod Testnet)
export const BLOCKFROST_API_URL = "https://cardano-preprod.blockfrost.io/api/v0";
export const BLOCKFROST_API_KEY = "preprodYOUR_BLOCKFROST_API_KEY_HERE"; // Get from blockfrost.io

// Wallet Mnemonics (24 words)
export const EMPLOYER_MNEMONIC = "your 24 word employer seed phrase here";
export const FREELANCER_MNEMONIC = "your 24 word freelancer seed phrase here";

// USDM Token Information
export const USDM_POLICY_ID = "c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad";
export const USDM_ASSET_NAME = "0014df105553444d"; // USDM in hex
export const USDM_UNIT = toUnit(USDM_POLICY_ID, USDM_ASSET_NAME);

// Lock Amount (5 USDM = 5,000,000 units, assuming 6 decimals)
export const LOCK_AMOUNT = 5_000_000n;

// Network
export const NETWORK = "Preprod" as const;