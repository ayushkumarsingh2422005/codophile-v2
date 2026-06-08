import { Metadata } from "next";
import { playgroundData } from "../../data";
import OverflowClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties.overflow;
    return { title: meta.title, description: meta.description, keywords: meta.keywords };
}

export default function OverflowPage() {
    return <OverflowClient />;
}
