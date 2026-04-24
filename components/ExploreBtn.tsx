"use client";

import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
    const handleClick = () => {
        console.log("CLICK");
        posthog.capture("explore_events_clicked");
    };

    return (
        <button id="explore-btn" type="button" className="mx-auto mt-7" onClick={handleClick}>
            <a href="#events">
                Explore Events
                <Image src="/icons/arrow-down.svg" alt="arror-down" width={24} height={24} />
            </a>
        </button>
    );
};
export default ExploreBtn;
