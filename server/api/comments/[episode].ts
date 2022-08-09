import { defineEventHandler } from 'h3';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async event => {
   /*
   const episodeId = event.context.params.episode;

   const client = serverSupabaseClient(event);

   const { data: comments } = await client.from("comments")
       .select("*")
       .eq("episodeId", episodeId);

   return comments;
    */

   return {};
});