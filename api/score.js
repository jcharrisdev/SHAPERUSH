import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
const MAX_SCORE = 10_000_000;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { id, score } = req.body || {};
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Datos inválidos' });
  // Basic sanity only: scores are reported by the client, so this is not anti-cheat.
  if (!Number.isInteger(score) || score < 0 || score > MAX_SCORE) {
    return res.status(400).json({ error: 'Score inválido' });
  }
  const cleanId = id.toUpperCase().replace(/[^A-Z0-9_]/g, '');
  if (!cleanId) return res.status(400).json({ error: 'ID inválido' });

  try {
    await sql`
      UPDATE players
      SET record = GREATEST(record, ${score}), updated_at = NOW()
      WHERE id = ${cleanId}
    `;
    const rows = await sql`SELECT id, record FROM players WHERE id = ${cleanId}`;
    return res.status(200).json(rows[0] || { id: cleanId, record: score });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error de servidor' });
  }
}
