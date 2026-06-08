import { Metadata } from "next";
import { playgroundData } from "../../data";
import ColumnsClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties.columns;
    return { title: meta.title, description: meta.description, keywords: meta.keywords };
}

export default function ColumnsPage() {
    return <ColumnsClient />;
}
