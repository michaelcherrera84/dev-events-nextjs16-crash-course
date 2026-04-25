import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

/**
 * Create a new event from multipart form data and upload its image to Cloudinary.
 *
 * Expects the request to include form fields for the event and an `image` file. Uploads the image, sets `image` to the Cloudinary `secure_url`, persists the event to the database, and returns a JSON response.
 *
 * @param req - NextRequest containing multipart `formData()` with event fields and an `image` file
 * @returns A NextResponse with JSON:
 *   - On success: status 201 and `{ message: "Event created successfully", event }`
 *   - On client error: status 400 and `{ message: string }` (e.g., missing/invalid data or missing image)
 *   - On server error: status 500 and `{ message: "Event Creation Failed", error: string }`
 */
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());
        } catch (e) {
            return NextResponse.json({ message: "Invalid JSON data format" }, { status: 400 });
        }

        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json({ message: "Image file is required" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ resource_type: "image", folder: "events" }, (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                })
                .end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url;

        const createdEvent = await Event.create(event);

        return NextResponse.json({ message: "Event created successfully", event: createdEvent }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            {
                message: "Event Creation Failed",
                error: e instanceof Error ? e.message : "Unknown",
            },
            { status: 500 },
        );
    }
}

/**
 * Retrieves all events from the database sorted by `createdAt` descending.
 *
 * @returns On success, an object containing `message` and `events` (array of event records). On failure, an object containing `message` and `error` (error message string or `"Unknown error"`).
 */
export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json({ message: "Events fetched successfully", events: events }, { status: 200 });
    } catch (e) {
        return NextResponse.json(
            {
                message: "Event fetching failed",
                error: e instanceof Error ? e.message : "Unknown error",
            },
            { status: 500 },
        );
    }
}
