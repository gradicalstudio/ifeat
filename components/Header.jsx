import { createClient } from "@/prismicio";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const client = createClient();
  const header = await client.getSingle("header");

  return <HeaderClient data={header.data} />;
}