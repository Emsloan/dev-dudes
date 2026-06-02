import { createClient } from '@supabase/supabase-js';

const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const secret = req.query.secret;
  if (secret !== process.env.ANALYTICS_READ_SECRET) return res.status(401).end();

  const days = parseInt(req.query.days ?? '30', 10);
  const since = Date.now() - days * 24 * 60 * 60 * 1000;

  const { data, error } = await db
    .from('analytics_events')
    .select('event_type, timestamp, path, referrer, country, device_type, browser, session_id')
    .eq('event_type', 'pageview')
    .gte('timestamp', since)
    .order('timestamp', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  const total_views    = data.length;
  const unique_sessions = new Set(data.map(e => e.session_id)).size;

  const by_referrer = tally(data, e => e.referrer || '(direct)');
  const by_country  = tally(data, e => e.country  || 'unknown');
  const by_device   = tally(data, e => e.device_type || 'unknown');
  const by_browser  = tally(data, e => e.browser  || 'unknown');

  res.status(200).json({
    period_days: days,
    total_views,
    unique_sessions,
    by_referrer,
    by_country,
    by_device,
    by_browser,
  });
}

function tally(rows, key_fn) {
  const counts = {};
  for (const row of rows) {
    const k = key_fn(row);
    counts[k] = (counts[k] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, count]) => ({ label, count }));
}
