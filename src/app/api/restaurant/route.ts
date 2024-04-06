import { NextRequest, NextResponse } from "next/server";
import { restaurantList } from "./config";

// Query
export async function GET(request: NextRequest): Promise<any> {
  return NextResponse.json(restaurantList);
}
