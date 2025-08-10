import type { NextApiRequest, NextApiResponse } from "next";
import { PatreonCreatorClient, QueryBuilder } from "patreon-api.ts";

let cachedData: {
    patronCount: number | null;
    lastFetchTime: number;
} | null = null;

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const now = Date.now();

    // Serve from cache if still valid
    if (cachedData && now - cachedData.lastFetchTime < CACHE_DURATION) {
        return res.status(200).json({
            patronCount: cachedData.patronCount,
        });
    }

    try {
        // Init Patreon client
        const client = new PatreonCreatorClient({
            oauth: {
                clientId: process.env.PATREON_CLIENT_ID!,
                clientSecret: process.env.PATREON_CLIENT_SECRET!,
                token: {
                    access_token: process.env.PATREON_CREATOR_ACCESS_TOKEN!,
                    refresh_token: process.env.PATREON_CREATOR_REFRESH_TOKEN!,
                },
            },
        });

        await client.initialize();

        // Build query to request only patron_count
        const query = QueryBuilder.campaign.setAttributes({
            campaign: ["patron_count"],
        });

        // Fetch data
        const campaignId = process.env.PATREON_CAMPAIGN_ID!;
        const { data } = await client.fetchCampaign(campaignId, query);
        const patronCount = data.attributes.patron_count ?? null;

        // Cache it
        cachedData = {
            patronCount,
            lastFetchTime: now,
        };

        return res.status(200).json({
            patronCount,
        });
    } catch (err: unknown) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return res.status(500).json({ error: err.message });
    }
}
