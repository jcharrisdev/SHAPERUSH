import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { id, score } = req.body || {};
  if (!id || typeof score !== 'number') return res.status(400).json({ error: 'Datos inválidos' });

  try {
    await sql`
      UPDATE players
      SET record = GREATEST(record, ${score}), updated_at = NOW()
      WHERE id = ${id}
    `;
    const rows = await sql`SELECT id, record FROM players WHERE id = ${id}`;
    return res.status(200).json(rows[0] || { id, record: score });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error de servidor' });
  }
}
