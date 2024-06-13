import { createKysely } from '@vercel/postgres-kysely';
import type { Database } from './kontakt';


export default createKysely<Database>();