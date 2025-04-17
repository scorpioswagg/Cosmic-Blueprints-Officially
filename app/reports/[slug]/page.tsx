import { notFound } from "next/navigation";

interface ReportDetailProps {
  params: { slug: string };
}

const REPORTS = Array.from({length: 12}, (_, i) => ({
  slug: `sample-report-${i+1}`,
  title: `Report Title ${i+1}`,
  description: `Detailed description for report ${i+1}.`,
}));

export default function ReportDetail({ params }: ReportDetailProps) {
  const report = REPORTS.find(r => r.slug === params.slug);
  if (!report) notFound();
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-slate-900 text-silver p-8">
      <h1 className="text-4xl font-bold mb-4">{report.title}</h1>
      <p className="mb-8 max-w-2xl">{report.description}</p>
      <a href="/checkout" className="inline-block mt-4 px-6 py-3 bg-indigo-700 hover:bg-indigo-800 rounded-lg shadow text-lg transition">Purchase Report</a>
    </main>
  );
}
