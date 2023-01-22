import { NextApiRequest, NextApiResponse } from "next";

/**
 * This handler is required because Next.js will try to cache everything
 * and the AWS health check will record 304s as failures.
 */
const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ ok: Date.now().toString() });
};

export default handler;
