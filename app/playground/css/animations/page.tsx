import { Metadata } from "next";
import { playgroundData } from "../../data";
import AnimationsClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties.animations;
    return { title: meta.title, description: meta.description, keywords: meta.keywords };
}

export default function AnimationsPage() {
    return <AnimationsClient />;
}
