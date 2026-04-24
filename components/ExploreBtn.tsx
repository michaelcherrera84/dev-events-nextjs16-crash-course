"use client";

import Image from "next/image";

const ExploreBtn = () => {
    return (
        <button id="explore-btn" type="button" className="mx-auto mt-7" onClick={() => console.log("CLICK")}>
            <a href="#events">Explore Events<Image src="/icons/arrow-down.svg" alt="arror-down" width={24} height={24} /></a>
        </button>
    );
};
export default ExploreBtn;
