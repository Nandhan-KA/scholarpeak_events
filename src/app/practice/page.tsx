import React from 'react';
import Link from 'next/link';

// Mock data for practice problems
const problems = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: 'Find two numbers in an array that add up to a target value.',
    difficulty: 'Easy',
    category: 'Arrays',
    solvedCount: 1250,
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    description: 'Determine if a linked list has a cycle in it.',
    difficulty: 'Easy',
    category: 'Linked Lists',
    solvedCount: 980,
  },
  {
    id: 'binary-tree-level-order',
    title: 'Binary Tree Level Order Traversal',
    description: 'Return the level order traversal of a binary tree\'s values.',
    difficulty: 'Medium',
    category: 'Trees',
    solvedCount: 756,
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    description: 'Merge all overlapping intervals and return the non-overlapping intervals.',
    difficulty: 'Medium',
    category: 'Arrays',
    solvedCount: 689,
  },
  {
    id: 'word-search',
    title: 'Word Search',
    description: 'Find if a word exists in a 2D board of characters.',
    difficulty: 'Medium',
    category: 'Backtracking',
    solvedCount: 542,
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    description: 'Design and implement a data structure for Least Recently Used (LRU) cache.',
    difficulty: 'Hard',
    category: 'Design',
    solvedCount: 421,
  },
];

// Categories for filtering
const categories = ['All', 'Arrays', 'Linked Lists', 'Trees', 'Backtracking', 'Design', 'Dynamic Programming'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

export default function PracticePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Practice Problems</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Sharpen your coding skills with our collection of practice problems.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
              defaultValue="All"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-auto">
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
              defaultValue="All"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-auto md:ml-auto self-end">
            <input
              type="text"
              placeholder="Search problems..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
            />
          </div>
        </div>

        {/* Problems List */}
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {problems.map((problem) => (
              <li key={problem.id}>
                <Link href={`/practice/${problem.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-lg font-medium text-primary-600 truncate">{problem.title}</p>
                        <div className="ml-4 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                              problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}>
                            {problem.difficulty}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className="text-sm text-gray-500">{problem.solvedCount} solved</span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {problem.description}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                          {problem.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-md shadow">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{' '}
                <span className="font-medium">100</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  &larr;
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center bg-primary-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  &rarr;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 