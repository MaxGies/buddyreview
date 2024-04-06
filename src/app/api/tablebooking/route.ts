import { NextRequest, NextResponse } from "next/server";

interface Booking {
  id: string;
  name: string;
  size: string;
  date: string;
  time: string;
  resId: string;
}

let booking: Booking[] = [];
let customId = 0;

// Query
export async function GET(request: NextRequest): Promise<any> {
  return NextResponse.json(booking);
}

export async function POST(request: NextRequest): Promise<any> {
  const data = await request.json();
  customId++;
  booking = [...booking, { id: customId.toString(), ...data }];

  return NextResponse.json(booking);
}

export async function DELETE(request: NextRequest): Promise<any> {
  const data = await request.json();
  booking = booking.filter((item) => item.id !== data.id);

  return NextResponse.json(booking);
}
