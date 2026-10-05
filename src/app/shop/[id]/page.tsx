import { notFound } from "next/navigation";
import { getItem, relatedItems } from "@/lib/data";
import { ProductDetail } from "@/components/ProductDetail";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getItem(id);
  if (!item) notFound();
  return <ProductDetail item={item} related={relatedItems(id)} />;
}
