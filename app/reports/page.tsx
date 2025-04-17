import Link from "next/link";

export default function ReportsCatalog() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-silver p-8">
      <h1 className="text-4xl font-bold mb-6">Astrology Reports</h1>
      <p className="mb-8 max-w-2xl">Browse our collection of in-depth astrology reports. Click any report to view details and purchase your personalized copy.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for dynamic report cards */}
        {[...Array(12)].map((_, i) => (
          <Link key={i} href={`/reports/sample-report-${i+1}`} className="block bg-slate-800 rounded-lg p-6 shadow hover:scale-105 transition">
            <h2 className="text-2xl font-semibold mb-2">Report Title {i+1}</h2>
            <p className="text-base opacity-80 mb-2">Short description of the report goes here.</p>
            <span className="inline-block mt-2 px-3 py-1 bg-indigo-700 rounded text-xs">View Details</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
