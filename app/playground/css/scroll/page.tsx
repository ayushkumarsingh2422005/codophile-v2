import { Metadata } from "next";
import { playgroundData } from "../../data";
import ScrollClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties.scroll;
    return { title: meta.title, description: meta.description, keywords: meta.keywords };
}

export default function ScrollPage() {
    return <ScrollClient />;
}
