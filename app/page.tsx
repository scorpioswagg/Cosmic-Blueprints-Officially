import { StarfieldHero } from '@/components/StarfieldHero';
import { ZodiacWheel } from '@/components/ZodiacWheel';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center">
        <StarfieldHero />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Cosmic Blueprint
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover Your Celestial Path Through Advanced Astrological Analysis
          </p>
          <Link
            href="/reports"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition-colors"
          >
            Explore Reports
          </Link>
        </div>
      </div>

      {/* Featured Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">
            Featured Astrological Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Natal Chart Analysis',
                price: '$29.99',
                description: 'Comprehensive analysis of your birth chart',
                link: '/reports/natal-chart'
              },
              {
                title: '3-Report Bundle',
                price: '$79.99',
                description: 'Personalized selection of three detailed reports',
                link: '/reports/bundle'
              },
              {
                title: 'Monthly Insights',
                price: '$19.99/mo',
                description: 'Regular astrological guidance and predictions',
                link: '/reports/monthly'
              }
            ].map((report) => (
              <div
                key={report.title}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
                <p className="text-gray-400 mb-4">{report.description}</p>
                <p className="text-2xl font-bold text-purple-400 mb-4">
                  {report.price}
                </p>
                <Link
                  href={report.link}
                  className="block text-center py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">
              Interactive Zodiac Wheel
            </h2>
            <p className="text-gray-300 mb-4">
              Explore your celestial blueprint with our interactive zodiac wheel.
              See how the planets align in your chart and discover their influence
              on your life path.
            </p>
            <Link
              href="/reports"
              className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
            >
              Get Your Reading
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <ZodiacWheel
              ascendant={0}
              planets={[
                { planet: 'Sun', degree: 45, sign: 'Taurus' },
                { planet: 'Moon', degree: 120, sign: 'Leo' },
                { planet: 'Mercury', degree: 200, sign: 'Libra' }
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
