"use server";

interface Booking {
  name: string;
  size: string;
  date: string;
  time: string;
  resId: string;
}

export async function getAllRestaurant() {
  const result = await fetch(`http://localhost:3000/api/restaurant`);
  return result.json();
}

export async function getRestaurant(resId: string) {
  const result = await fetch(`http://localhost:3000/api/restaurant/${resId}`);
  return result.json();
}

export async function sendBooking({ name, size, date, time, resId }: Booking) {
  const result = await fetch(`http://localhost:3000/api/tablebooking`, {
    method: "POST",
    body: JSON.stringify({ name, size, date, time, resId }),
  });
  return result.json();
}

export async function getBooking() {
  const result = await fetch(`http://localhost:3000/api/tablebooking`);
  return result.json();
}

export async function deleteBooking(bookingId: string) {
  const result = await fetch(`http://localhost:3000/api/tablebooking`, {
    method: "DELETE",
    body: JSON.stringify({ id: bookingId }),
  });
  return result.json();
}
