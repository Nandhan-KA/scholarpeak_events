import React from 'react';
import Link from 'next/link';

// Mock data for competitions
const competitions = [
  {
    id: 'algorithm-challenge',
    title: 'Algorithm Challenge',
    description: 'Solve complex algorithmic problems in this week\'s competition.',
    date: 'June 15, 2025',
    difficulty: 'Medium',
    participants: 120,
    status: 'upcoming',
  },
  {
    id: 'web-dev-hackathon',
    title: 'Web Development Hackathon',
    description: 'Build a complete web application in 48 hours.',
    date: 'June 22-24, 2025',
    difficulty: 'Hard',
    participants: 85,
    status: 'upcoming',
  },
  {
    id: 'data-structures',
    title: 'Data Structures Deep Dive',
    description: 'Test your knowledge of advanced data structures.',
    date: 'May 30, 2025',
    difficulty: 'Hard',
    participants: 156,
    status: 'completed',
  },
  {
    id: 'frontend-challenge',
    title: 'Frontend Challenge',
    description: 'Create responsive UI components with React.',
    date: 'May 15, 2025',
    difficulty: 'Easy',
    participants: 210,
    status: 'completed',
  },
];

export default function CompetitionsPage() {
  // Filter competitions by status
  const upcomingCompetitions = competitions.filter(comp => comp.status === 'upcoming');
  const pastCompetitions = competitions.filter(comp => comp.status === 'completed');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Coding Competitions</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Test your skills, compete with peers, and win prizes in our weekly coding competitions.
          </p>
        </div>

        {/* Upcoming Competitions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Competitions</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {upcomingCompetitions.map((competition) => (
              <div key={competition.id} className="card border-l-4 border-primary-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{competition.title}</h3>
                    <p className="text-gray-600 mb-4">{competition.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                        {competition.date}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                        {competition.difficulty}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                        {competition.participants} participants
                      </span>
                    </div>
                  </div>
                  <Link href={`/competitions/${competition.id}`} className="btn-primary text-sm">
                    Register
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Competitions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Competitions</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pastCompetitions.map((competition) => (
              <div key={competition.id} className="card border-l-4 border-gray-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{competition.title}</h3>
                    <p className="text-gray-600 mb-4">{competition.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                        {competition.date}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                        {competition.difficulty}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                        {competition.participants} participants
                      </span>
                    </div>
                  </div>
                  <Link href={`/competitions/${competition.id}`} className="btn-secondary text-sm">
                    View Results
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 