import { Metadata } from "next";
import { playgroundData } from "../../data";
import OpacityBlendClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties["opacity-blend"];
    return { title: meta.title, description: meta.description, keywords: meta.keywords };
}

export default function OpacityBlendPage() {
    return <OpacityBlendClient />;
}
