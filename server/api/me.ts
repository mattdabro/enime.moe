import { serverSupabaseUser } from '#supabase/server';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    return await serverSupabaseUser(event)
})