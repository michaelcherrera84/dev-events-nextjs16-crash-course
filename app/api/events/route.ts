import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

/**
 * Create an event from multipart form data and upload its image to Cloudinary.
 *
 * Expects multipart form fields describing the event and an `image` file. Parses `tags` and `agenda` from their form fields, uploads the image to Cloudinary, sets the event's `image` to the returned `secure_url`, persists the event to the database, and returns a JSON response indicating outcome.
 *
 * @param req - NextRequest containing multipart `formData()` with event fields and an `image` file
 * @returns A JSON NextResponse:
 *   - `201` with `{ message: "Event created successfully", event }` on success
 *   - `400` with `{ message: string }` for client errors (e.g., invalid form data or missing image)
 *   - `500` with `{ message: "Event Creation Failed", error: string }` for server errors
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

        let tags = JSON.parse(formData.get("tags") as string);
        let agenda = JSON.parse(formData.get("agenda") as string);

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

        const createdEvent = await Event.create({
            ...event,
            tags: tags,
            agenda: agenda,
        });

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
