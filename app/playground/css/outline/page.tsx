import { Metadata } from "next";
import { playgroundData } from "../../data";
import OutlinePlaygroundClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties.outline;

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

export default function OutlinePlaygroundPage() {
    return <OutlinePlaygroundClient />;
}
