export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Liveness deliberately has no imports, environment validation or network calls.
export function GET() {
  return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
}
