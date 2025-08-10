import type { NextApiRequest, NextApiResponse } from "next";

let cachedData: {
    serverCount: number | null;
    termsUrl: string | null;
    privacyUrl: string | null;
    lastFetchTime: number;
} | null = null;

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const now = Date.now();

    if (cachedData && now - cachedData.lastFetchTime < CACHE_DURATION) {
        return res.status(200).json({
            serverCount: cachedData.serverCount,
            termsUrl: cachedData.termsUrl,
            privacyUrl: cachedData.privacyUrl,
        });
    }

    try {
        const response = await fetch("https://discord.com/api/v10/applications/@me", {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Discord API error: ${response.status}`);
        }

        const data = await response.json();

        cachedData = {
            serverCount: data.approximate_guild_count ?? null,
            termsUrl: data.terms_of_service_url ?? null,
            privacyUrl: data.privacy_policy_url ?? null,
            lastFetchTime: now,
        };

        return res.status(200).json({
            serverCount: cachedData.serverCount,
            termsUrl: cachedData.termsUrl,
            privacyUrl: cachedData.privacyUrl,
        });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}
