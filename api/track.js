import { createClient } from '@supabase/supabase-js';

const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { path, referrer } = req.body ?? {};

  const ua = req.headers['user-agent'] ?? '';
  const device_type = /mobile/i.test(ua) ? 'mobile' : /tablet/i.test(ua) ? 'tablet' : 'desktop';

  const row = {
    event_type:  'pageview',
    timestamp:   Date.now(),
    path:        path        ?? '/',
    referrer:    referrer    || null,
    country:     req.headers['x-vercel-ip-country'] ?? null,
    city:        req.headers['x-vercel-ip-city']    ?? null,
    device_type,
    browser:     null,
    os:          null,
    session_id:  null,
    raw:         { ua, headers: { country: req.headers['x-vercel-ip-country'], city: req.headers['x-vercel-ip-city'] } },
  };

  const { error } = await db.from('analytics_events').insert(row);
  if (error) console.error('track insert failed:', error.message);

  res.status(200).end();
}
