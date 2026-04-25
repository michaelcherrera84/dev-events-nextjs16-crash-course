"use server";

import connectDB from "@/lib/mongodb";
import { Booking } from "@/database";

export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string }) => {
    try {
        await connectDB();
        await Booking.create({ eventId, slug, email });
        return { success: true };
    } catch (e) {
        console.error("Error creating booking:", e);
        return { success: false };
    }
};

export const getBookingsCountByEventId = async (eventId: string) => {
    try {
        await connectDB();
        return await Booking.countDocuments({ eventId });
    } catch (e) {
        console.error("Error fetching bookings count:", e);
        return 0;
    }
};
