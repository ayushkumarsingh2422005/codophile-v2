import { Metadata } from "next";
import { playgroundData } from "../../data";
import InteractionClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties.interaction;
    return { title: meta.title, description: meta.description, keywords: meta.keywords };
}

export default function InteractionPage() {
    return <InteractionClient />;
}
