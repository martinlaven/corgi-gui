import { createDecoder } from '@cardog/corgi';

console.log('Pre-warming VPIC database...');
const d = await createDecoder();
await d.close();
console.log('Database cached.');
