import { Metadata } from "next";
import { playgroundData } from "../../data";
import TailwindOutlinePlayground from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.tailwind.properties["outline"];

    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        openGraph: {
            title: meta.title,
            description: meta.description,
            type: "article",
            siteName: "Codophile",
        },
        twitter: {
            card: "summary_large_image",
            title: meta.title,
            description: meta.description,
        },
    };
}

export default function TailwindOutlinePage() {
    return <TailwindOutlinePlayground />;
}
