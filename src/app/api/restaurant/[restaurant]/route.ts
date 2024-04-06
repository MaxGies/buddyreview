import { NextRequest, NextResponse } from "next/server";
import { restaurantList } from "../config";

interface Params {
  params: {
    restaurant: string;
  };
}

// Query
export async function GET(
  request: NextRequest,
  { params }: Params
): Promise<any> {
  return NextResponse.json(
    restaurantList.filter((restaurant) => restaurant.id === params.restaurant)
  );
}
