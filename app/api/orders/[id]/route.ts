//app>api>orders>[id]>route.js
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Order } from "@/models/Order";

// Add the correct type for params
interface Params {
  id: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    await connectToDB();
    const order = await Order.findById(params.id);
    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
