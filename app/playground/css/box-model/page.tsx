import { Metadata } from "next";
import { playgroundData } from "../../data";
import BoxModelClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties["box-model"];
    return { title: meta.title, description: meta.description, keywords: meta.keywords };
}

export default function BoxModelPage() {
    return <BoxModelClient />;
}
