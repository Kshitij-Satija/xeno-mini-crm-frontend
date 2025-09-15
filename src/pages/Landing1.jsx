import React from 'react';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
    const navigate = useNavigate(); 
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-6xl w-full space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            🚀 Xeno SDE Internship Assignment 2025
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
            Mini CRM Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A scalable customer relationship management tool for intelligent segmentation, personalized campaigns, and AI-powered insights. Built with modern tech for real-world impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Begin Journey Button */}
<div style={{ display: "inline-block", position: "relative" }} className="group">
  <button
    style={{
      position: "relative",
      padding: "0.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#fff",
      backgroundColor: "#111",
      borderRadius: "1rem",
      boxShadow: "0 25px 50px -12px rgba(72, 187, 120, 0.75)",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    }}
    className="group-hover:scale-105 active:scale-95"
  >
    <span
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "1rem",
        background: "linear-gradient(to right, #10b981, #06b6d4, #0ea5e9)",
        padding: "2px",
        opacity: 0,
        transition: "opacity 0.5s",
      }}
      className="group-hover:opacity-100"
    ></span>
    <span
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#111",
        borderRadius: "1rem",
      }}
    >
      <span
        style={{
          transition: "all 0.5s",
        }}
        className="group-hover:translate-x-1.5 group-hover:text-emerald-300"
      >
        Try out 
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{
          width: "1.75rem",
          height: "1.75rem",
          transition: "all 0.5s",
        }}
        className="group-hover:translate-x-1.5 group-hover:text-emerald-300"
      >
        <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
      </svg>
    </span>
  </button>
</div>

{/* GitHub Button */}


<a
  href="https://github.com/your-repo"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    cursor: "pointer",
    padding: "0.75rem 1rem",
    fontWeight: 800,
    fontSize: "0.825rem",
    lineHeight: "1rem",
    borderRadius: "100px",
    backgroundColor: "#000",
    color: "#fff",
    textDecoration: "none",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.color = "#fce803";
    e.currentTarget.style.transform = "translateY(-0.25rem)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.99992 1.33331C7.12444 1.33331 6.25753 1.50575 5.4487 1.84078C4.63986 2.17581 3.90493 2.66688 3.28587 3.28593C2.03563 4.53618 1.33325 6.23187 1.33325 7.99998C1.33325 10.9466 3.24659 13.4466 5.89325 14.3333C6.22659 14.3866 6.33325 14.18 6.33325 14C6.33325 13.8466 6.33325 13.4266 6.33325 12.8733C4.48659 13.2733 4.09325 11.98 4.09325 11.98C3.78659 11.2066 3.35325 11 3.35325 11C2.74659 10.5866 3.39992 10.6 3.39992 10.6C4.06659 10.6466 4.41992 11.2866 4.41992 11.2866C4.99992 12.3 5.97992 12 6.35992 11.84C6.41992 11.4066 6.59325 11.1133 6.77992 10.9466C5.29992 10.78 3.74659 10.2066 3.74659 7.66665C3.74659 6.92665 3.99992 6.33331 4.43325 5.85998C4.36659 5.69331 4.13325 4.99998 4.49992 4.09998C4.49992 4.09998 5.05992 3.91998 6.33325 4.77998C6.85992 4.63331 7.43325 4.55998 7.99992 4.55998C8.56659 4.55998 9.13992 4.63331 9.66659 4.77998C10.9399 3.91998 11.4999 4.09998 11.4999 4.09998C11.8666 4.99998 11.6333 5.69331 11.5666 5.85998C11.9999 6.33331 12.2533 6.92665 12.2533 7.66665C12.2533 10.2133 10.6933 10.7733 9.20659 10.94C9.44659 11.1466 9.66659 11.5533 9.66659 12.1733C9.66659 13.0666 9.66659 13.7866 9.66659 14C9.66659 14.18 9.77325 14.3933 10.1133 14.3333C12.7599 13.44 14.6666 10.9466 14.6666 7.99998C14.6666 7.1245 14.4941 6.25759 14.1591 5.44876C13.8241 4.63992 13.333 3.90499 12.714 3.28593C12.0949 2.66688 11.36 2.17581 10.5511 1.84078C9.7423 1.50575 8.8754 1.33331 7.99992 1.33331V1.33331Z"></path>
  </svg>
  <span>View on Github</span>
</a>



          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Feature 1 */}
          <div className="group bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start space-x-4 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Secure Data Ingestion</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              REST APIs for seamless customer and orders data ingestion, with pub-sub for async scalability.
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> Swagger UI docs</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> Validation & persistence</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> Message brokering</li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="group bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start space-x-4 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Campaign Builder UI</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Dynamic rule-based segmentation with previews and intuitive history dashboard.
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> AND/OR logic</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> Audience previews</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> Campaign tracking</li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="group bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start space-x-4 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Delivery & Logging</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Personalized message delivery with simulated vendor API and real-time status updates.
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> 90% success simulation</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> Receipt API</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> Batch processing</li>
            </ul>
          </div>

          {/* Feature 4 */}
          <div className="group bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-start space-x-4 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">Google OAuth Auth</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Secure login to gatekeep sensitive features like audience creation and campaign views.
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> OAuth 2.0 flow</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> Protected routes</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> Session handling</li>
            </ul>
          </div>

          {/* AI Features Section - Spanning full width */}
          <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-purple-200">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🧠 AI-Powered Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Integrated with Gemini for intelligent CRM enhancements: natural language processing, message generation, performance insights, and auto-tagging.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-purple-700">Natural Language to Segment Rules</h4>
                </div>
                <p className="text-gray-600">
                  Users input prompts like "People who haven’t shopped in 6 months and spent over ₹5K" to auto-generate logical segmentation rules.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-blue-700">AI-Driven Message Suggestions</h4>
                </div>
                <p className="text-gray-600">
                  Generates 3 personalized message variants based on objectives like "bring back inactive users", plus bonus product/offer image recommendations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-full">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-green-700">Campaign Performance Summarization</h4>
                </div>
                <p className="text-gray-600">
                  Transforms raw stats into readable insights: "Your campaign reached 1,284 users. 1,140 messages delivered. High-spend customers: 95% rate."
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-orange-700">Auto-tagging Campaigns</h4>
                </div>
                <p className="text-gray-600">
                  Automatically labels campaigns (e.g., "Win-back", "High Value Customers") using AI analysis of audience and message intent.
                </p>
              </div>
            </div>
            <div className="text-center mt-6 text-sm text-gray-500">
              Powered by Gemini API for advanced natural language processing and generative capabilities.
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Powered By Modern Tech
          </h2>
          <div className="flex flex-wrap justify-center items-center space-x-4 space-y-4">
            {['Google OAuth','React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Gemini API'].map((tech) => (
              <span key={tech} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">
                {tech}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            Deployed on Vercel | Ready for Demo on Sep 15, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;