import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const rows = await sql`
      SELECT id, record
      FROM players
      WHERE record > 0
      ORDER BY record DESC
      LIMIT 20
    `;
    return res.status(200).json({ rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ rows: [] });
  }
}
