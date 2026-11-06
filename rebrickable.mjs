export default async (request) => {
  const apiKey = process.env.REBRICKABLE_API_KEY;
  if (!apiKey) {
    return json({ error: 'Falta configurar REBRICKABLE_API_KEY en las variables de entorno de Netlify.' }, 500);
  }

  const incoming = new URL(request.url);
  const path = incoming.searchParams.get('path');
  if (!path || !path.startsWith('/lego/') || path.includes('..') || path.startsWith('//')) {
    return json({ error: 'Ruta de consulta no válida.' }, 400);
  }

  try {
    const upstream = await fetch(`https://rebrickable.com/api/v3${path}`, {
      headers: { Authorization: `key ${apiKey}`, Accept: 'application/json' }
    });
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/json',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (error) {
    return json({ error: 'No fue posible conectar con Rebrickable. Intenta de nuevo.' }, 502);
  }
};

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}
