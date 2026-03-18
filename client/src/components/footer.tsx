"use client";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Footer3() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-white dark:bg-black w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 border-t border-gray-200 dark:border-zinc-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg">
                Get the latest updates, tips, and exclusive content delivered
                straight to your inbox. Join our newsletter and never miss
                important announcements.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#e86100] hover:bg-white text-white hover:text-black font-medium rounded-lg transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <NavLink to={"/"}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/"}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/"}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Help Center
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/"}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 YourBrand. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <NavLink to={"/"}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Privacy Policy
              </NavLink>
              <NavLink  to={"/"}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Terms
              </NavLink>
              <NavLink to={"/"}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Cookies
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
