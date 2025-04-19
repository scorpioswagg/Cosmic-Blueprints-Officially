import { notFound } from "next/navigation";

interface ReportDetailProps {
  // Next.js 15 passes dynamic-route params as a Promise :contentReference[oaicite:2]{index=2}
  params: Promise<{ slug: string }>;
}

export default async function ReportDetail({ params }: ReportDetailProps) {
  // Await the promise to extract slug :contentReference[oaicite:4]{index=4}
  const { slug } = await params;
}
export default function ReportDetail({ params }: ReportDetailProps) {
 const report = REPORTS.find(r => r.slug === slug);
  if (!report) notFound();
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-slate-900 text-silver p-8">
      <h1 className="text-4xl font-bold mb-4">{report.title}</h1>
      <p className="mb-8 max-w-2xl">{report.description}</p>
      <a href="/checkout" className="inline-block mt-4 px-6 py-3 bg-indigo-700 hover:bg-indigo-800 rounded-lg shadow text-lg transition">Purchase Report</a>
    </main>
  );
}
