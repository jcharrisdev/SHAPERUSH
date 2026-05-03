import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.body || {};
  if (!id || typeof id !== 'string' || id.length < 2 || id.length > 16) {
    return res.status(400).json({ error: 'ID inválido (2-16 caracteres)' });
  }
  const cleanId = id.toUpperCase().replace(/[^A-Z0-9_]/g, '');
  if (!cleanId) return res.status(400).json({ error: 'ID inválido' });

  try {
    // Upsert user
    await sql`
      INSERT INTO players (id, record, created_at)
      VALUES (${cleanId}, 0, NOW())
      ON CONFLICT (id) DO NOTHING
    `;
    const rows = await sql`SELECT id, record FROM players WHERE id = ${cleanId}`;
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error de servidor' });
  }
}
