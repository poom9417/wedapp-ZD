import { getReadiness } from "@/services/readiness";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(getReadiness(), {
    status: 503,
    headers: { "Cache-Control": "no-store" },
  });
}
