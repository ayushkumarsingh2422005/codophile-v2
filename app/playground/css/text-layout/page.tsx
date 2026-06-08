import { Metadata } from "next";
import { playgroundData } from "../../data";
import TextLayoutClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties["text-layout"];
    return { title: meta.title, description: meta.description, keywords: meta.keywords };
}

export default function TextLayoutPage() {
    return <TextLayoutClient />;
}
