export default function Blog() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-silver p-8">
      <h1 className="text-4xl font-bold mb-6">Astrology Insights Blog</h1>
      <p className="mb-8 max-w-2xl">Explore the latest astrology insights, cosmic trends, and celestial guidance from our team of astrologers.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for blog post cards */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-slate-800 rounded-lg p-6 shadow hover:scale-105 transition">
            <h2 className="text-2xl font-semibold mb-2">Blog Post {i+1}</h2>
            <p className="text-base opacity-80 mb-2">Short summary of the blog post goes here.</p>
            <span className="inline-block mt-2 px-3 py-1 bg-indigo-700 rounded text-xs">Read More</span>
          </div>
        ))}
      </div>
    </main>
  );
}
