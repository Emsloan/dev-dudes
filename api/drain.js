import { createClient } from '@supabase/supabase-js';

const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const secret = req.headers['x-vercel-drain-secret'];
  if (secret !== process.env.DRAIN_SECRET) return res.status(401).end();

  const events = Array.isArray(req.body) ? req.body : [req.body];

  const rows = events.map(e => ({
    event_type:  e.eventType,
    timestamp:   e.timestamp,
    path:        e.path        ?? null,
    referrer:    e.referrer    ?? null,
    country:     e.country     ?? null,
    city:        e.city        ?? null,
    device_type: e.deviceType  ?? null,
    browser:     e.clientName  ?? null,
    os:          e.osName      ?? null,
    session_id:  e.sessionId   ?? null,
    raw:         e,
  }));

  const { error } = await db.from('analytics_events').insert(rows);
  if (error) { console.error(error); return res.status(500).end(); }

  res.status(200).end();
}
