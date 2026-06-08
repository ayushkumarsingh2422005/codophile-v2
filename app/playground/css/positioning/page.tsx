import { Metadata } from "next";
import { playgroundData } from "../../data";
import PositioningClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties.positioning;
    return { title: meta.title, description: meta.description, keywords: meta.keywords };
}

export default function PositioningPage() {
    return <PositioningClient />;
}
