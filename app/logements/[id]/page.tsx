import { PropertyDetail } from '@/app/page'
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <PropertyDetail id={id} />
}
