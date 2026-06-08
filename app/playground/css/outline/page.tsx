import { Metadata } from "next";
import { playgroundData } from "../../data";
import OutlineClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties.outline;
    return { title: meta.title, description: meta.description, keywords: meta.keywords };
}

export default function OutlinePage() {
    return <OutlineClient />;
}
