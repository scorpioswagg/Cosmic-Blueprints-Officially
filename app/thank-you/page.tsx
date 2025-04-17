export default function ThankYou() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-slate-900 text-silver p-8">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="mb-6">Your purchase was successful. Check your email for your personalized astrology report and further instructions.</p>
      <a href="/reports" className="inline-block mt-4 px-6 py-3 bg-indigo-700 hover:bg-indigo-800 rounded-lg shadow text-lg transition">Browse More Reports</a>
    </main>
  );
}
