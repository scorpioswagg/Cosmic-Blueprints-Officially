import { NextRequest, NextResponse } from "next/server";
import { astrologyEngine } from "@/lib/astrology/engine";
import type { ReportConfig } from "@/lib/types/astrology";

export async function POST(req: NextRequest) {
  try {
    const config: ReportConfig = await req.json();
    const chart = await astrologyEngine.calculateChart(config);
    return NextResponse.json(chart);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to calculate chart" },
      { status: 500 }
    );
  }
}
