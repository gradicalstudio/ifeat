import { createClient } from "@/prismicio";
import FooterClient from "./FooterClient";

export default async function Footer() {
  const client = createClient();
  const footer = await client.getSingle("footer");

  return <FooterClient data={footer.data} />;
}
