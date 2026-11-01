export async function POST(req: Request) {
  const body = await req.json();
  console.log('Logging error:', body);
  return new Response(null, { status: 200 });
}
