import { Metadata } from "next";
import { playgroundData } from "../../data";
import ListsClient from "./ClientPlayground";

export async function generateMetadata(): Promise<Metadata> {
    const meta = playgroundData.css.properties.lists;
    return { title: meta.title, description: meta.description, keywords: meta.keywords };
}

export default function ListsPage() {
    return <ListsClient />;
}
