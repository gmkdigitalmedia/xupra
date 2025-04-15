import { useAppContext } from "@/contexts/app-context";
import Logo from "@/components/logo";
import FeatureCard from "@/components/feature-card";
import InfluencerNetworkVisualization from "@/components/influencer-network-visualization";

const Home = () => {
  const { login } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center">
        <Logo size="lg" />
        <div className="flex space-x-4">
          <button 
            onClick={login} 
            className="bg-primary hover:bg-primary/80 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-8 mt-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span>The</span>
                <span className="text-primary"> AI-Powered</span>
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">HCP Engagement Platform</h2>
              <p className="text-xl text-gray-300 mb-8">
                Xupra leverages artificial intelligence to enhance HCP engagement with personalized, 
                compliant marketing across every touchpoint.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <button 
                  onClick={login}
                  className="bg-primary hover:bg-primary/80 text-white font-medium px-8 py-3 rounded-lg transition"
                >
                  Get Started
                </button>
                <button className="border border-white hover:bg-white/10 text-white font-medium px-8 py-3 rounded-lg transition">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Desktop network visualization */}
            <div className="hidden lg:block relative">
              <div className="bg-background-card shadow-lg rounded-xl p-3 overflow-hidden">
                <div className="absolute top-4 left-5 z-10">
                  <h3 className="text-lg font-semibold">HCP Influencer Network</h3>
                  <p className="text-sm text-gray-400">Interactive intelligence for targeted engagement</p>
                </div>
                <div className="h-[400px] w-full relative">
                  <InfluencerNetworkVisualization />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background-card to-transparent">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">KOLs</span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">Prescribers</span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">Researchers</span>
                      </div>
                      <button onClick={login} className="text-xs text-primary hover:text-primary/80 font-medium">View Full Analytics</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile network visualization */}
            <div className="mt-8 lg:hidden">
              <div className="bg-background-card shadow-lg rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="text-lg font-semibold">HCP Influencer Network</h3>
                  <p className="text-sm text-gray-400">Powerful connection mapping for strategic engagement</p>
                </div>
                <div className="h-[250px] w-full relative">
                  <InfluencerNetworkVisualization />
                </div>
                <div className="p-3 border-t border-gray-800 bg-background-lighter">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">KOLs</span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">Prescribers</span>
                    </div>
                    <button 
                      onClick={login}
                      className="text-xs bg-primary px-3 py-1.5 rounded hover:bg-primary/80 font-medium"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background-lighter">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon="label"
              title="MediTag Engine"
              description="Segment healthcare providers based on prescribing patterns and responsiveness."
              path="/meditag"
            />

            <FeatureCard 
              icon="create"
              title="ContentCraft AI"
              description="Generate personalized content with built-in MLR pre-screening compliance."
              path="/contentcraft"
            />

            <FeatureCard 
              icon="trending_up"
              title="EngageOptic"
              description="Optimize channels and timing for each healthcare provider segment."
              path="/engageoptic"
            />

            <FeatureCard 
              icon="pie_chart"
              title="InsightLens"
              description="Analyze campaign performance and compliance with detailed metrics."
              path="/insightlens"
            />

            <FeatureCard 
              icon="forum"
              title="InteractCraft AI"
              description="Engage HCPs through virtual advisory boards, discussion forums, and consensus surveys."
              path="/interactcraft"
            />
          </div>
        </div>
      </section>

      {/* Feature Details Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* MediTag Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="inline-block bg-primary/10 text-primary font-medium px-3 py-1 rounded-full mb-4">
                /01
              </div>
              <h2 className="text-3xl font-bold mb-4">MediTag Engine</h2>
              <p className="text-gray-300 mb-6">
                Our MediTag Engine uses advanced machine learning to analyze prescribing data and segment healthcare providers, 
                enabling a personalized approach to each physician based on their unique characteristics.
              </p>
              <button 
                onClick={() => login()}
                className="bg-primary hover:bg-primary/80 text-white font-medium px-6 py-2 rounded-lg transition"
              >
                Start Tagging
              </button>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="bg-background-card px-4 py-2 rounded-full text-sm">Early Adopters</span>
                <span className="bg-background-card px-4 py-2 rounded-full text-sm">Evidence Driven</span>
                <span className="bg-background-card px-4 py-2 rounded-full text-sm">Patient Focused</span>
                <span className="bg-background-card px-4 py-2 rounded-full text-sm">Balanced</span>
              </div>
            </div>
            <div className="bg-background-card rounded-xl p-6 shadow-lg">
              <div className="overflow-hidden rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">HCP Segmentation Results</h3>
                  <span className="text-sm text-gray-400">125 HCPs Analyzed</span>
                </div>
                <div className="h-60 w-full bg-background-lighter rounded-lg flex items-center justify-center">
                  <div className="text-center p-4 w-full">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Early Adopters</span>
                      <span>32%</span>
                    </div>
                    <div className="w-full bg-background-dark h-2 rounded-full mb-4">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-2">
                      <span>Evidence Driven</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-background-dark h-2 rounded-full mb-4">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-2">
                      <span>Patient Focused</span>
                      <span>24%</span>
                    </div>
                    <div className="w-full bg-background-dark h-2 rounded-full mb-4">
                      <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-2">
                      <span>Balanced</span>
                      <span>16%</span>
                    </div>
                    <div className="w-full bg-background-dark h-2 rounded-full">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '16%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* ContentCraft Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1 bg-background-card rounded-xl p-6 shadow-lg">
              <div className="overflow-hidden rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">AI Content Generation</h3>
                  <span className="text-sm text-gray-400">Personalized for Dr. Sarah Chen</span>
                </div>
                <div className="bg-background-lighter rounded-lg p-4 text-sm">
                  <p className="mb-3">
                    Dear Dr. Chen,
                  </p>
                  <p className="mb-3">
                    Following your recent interest in cardiovascular treatments with minimal side effects, 
                    I wanted to share our latest clinical data on [Product Name]. Recent studies have shown a 27% reduction 
                    in adverse events compared to standard therapies.
                  </p>
                  <p>
                    Would you be interested in reviewing the full study results? I'd be happy to schedule a brief discussion 
                    at your convenience.
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="inline-flex items-center bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">
                    <span className="material-icons text-sm mr-1">check_circle</span> 
                    Medical Compliance
                  </span>
                  <span className="inline-flex items-center bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded">
                    <span className="material-icons text-sm mr-1">check_circle</span> 
                    Legal Compliance
                  </span>
                  <span className="inline-flex items-center bg-yellow-900/30 text-yellow-400 text-xs px-2 py-1 rounded">
                    <span className="material-icons text-sm mr-1">warning</span> 
                    Regulatory Review
                  </span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-primary/10 text-primary font-medium px-3 py-1 rounded-full mb-4">
                /02
              </div>
              <h2 className="text-3xl font-bold mb-4">ContentCraft AI</h2>
              <p className="text-gray-300 mb-6">
                ContentCraft AI generates personalized content for each HCP, automatically ensuring Medical, Legal, 
                and Regulatory (MLR) compliance while maintaining engagement effectiveness.
              </p>
              <button 
                onClick={() => login()}
                className="bg-primary hover:bg-primary/80 text-white font-medium px-6 py-2 rounded-lg transition"
              >
                Create Content
              </button>
            </div>
          </div>
          
          {/* EngageOptic Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="inline-block bg-primary/10 text-primary font-medium px-3 py-1 rounded-full mb-4">
                /03
              </div>
              <h2 className="text-3xl font-bold mb-4">EngageOptic</h2>
              <p className="text-gray-300 mb-6">
                EngageOptic uses predictive analytics to identify the optimal engagement channels and timing 
                for each HCP, significantly improving response rates and overall campaign performance.
              </p>
              <button 
                onClick={() => login()}
                className="bg-primary hover:bg-primary/80 text-white font-medium px-6 py-2 rounded-lg transition"
              >
                Optimize Campaigns
              </button>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm">Email</span>
                <span className="bg-background-card px-4 py-2 rounded-full text-sm">Video</span>
                <span className="bg-background-card px-4 py-2 rounded-full text-sm">In-person</span>
                <span className="bg-background-card px-4 py-2 rounded-full text-sm">Webinar</span>
                <span className="bg-background-card px-4 py-2 rounded-full text-sm">Call</span>
              </div>
            </div>
            <div className="bg-background-card rounded-xl p-6 shadow-lg">
              <div className="overflow-hidden rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Channel Optimization</h3>
                  <span className="text-sm text-gray-400">Cardiology Specialists</span>
                </div>
                <div className="h-60 w-full bg-background-lighter rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-5 gap-4 w-full px-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-primary h-32 w-6 rounded-t-lg"></div>
                      <span className="text-xs mt-2">Email</span>
                      <span className="text-xs text-gray-400">42%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-400 h-16 w-6 rounded-t-lg"></div>
                      <span className="text-xs mt-2">Video</span>
                      <span className="text-xs text-gray-400">21%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-indigo-400 h-24 w-6 rounded-t-lg"></div>
                      <span className="text-xs mt-2">In-person</span>
                      <span className="text-xs text-gray-400">31%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-purple-400 h-10 w-6 rounded-t-lg"></div>
                      <span className="text-xs mt-2">Webinar</span>
                      <span className="text-xs text-gray-400">13%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-pink-400 h-8 w-6 rounded-t-lg"></div>
                      <span className="text-xs mt-2">Call</span>
                      <span className="text-xs text-gray-400">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* InsightLens Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-background-card rounded-xl p-6 shadow-lg">
              <div className="overflow-hidden rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Campaign Performance</h3>
                  <span className="text-sm text-gray-400">Q2 2023</span>
                </div>
                <div className="h-60 w-full bg-background-lighter rounded-lg flex items-center justify-center">
                  <div className="w-full p-4">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-2xl font-bold">78%</h4>
                        <p className="text-xs text-gray-400">Open Rate</p>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold">36%</h4>
                        <p className="text-xs text-gray-400">Response Rate</p>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold">3.2x</h4>
                        <p className="text-xs text-gray-400">ROI</p>
                      </div>
                    </div>
                    
                    <div className="relative h-24 w-full">
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-700"></div>
                      <div className="absolute bottom-0 left-0 h-16 w-8 bg-primary/20"></div>
                      <div className="absolute bottom-0 left-0 h-12 w-8 bg-primary"></div>
                      
                      <div className="absolute bottom-0 left-[calc(12.5%)] h-20 w-8 bg-primary/20"></div>
                      <div className="absolute bottom-0 left-[calc(12.5%)] h-14 w-8 bg-primary"></div>
                      
                      <div className="absolute bottom-0 left-[calc(25%)] h-24 w-8 bg-primary/20"></div>
                      <div className="absolute bottom-0 left-[calc(25%)] h-18 w-8 bg-primary"></div>
                      
                      <div className="absolute bottom-0 left-[calc(37.5%)] h-20 w-8 bg-primary/20"></div>
                      <div className="absolute bottom-0 left-[calc(37.5%)] h-16 w-8 bg-primary"></div>
                      
                      <div className="absolute bottom-0 left-[calc(50%)] h-18 w-8 bg-primary/20"></div>
                      <div className="absolute bottom-0 left-[calc(50%)] h-12 w-8 bg-primary"></div>
                      
                      <div className="absolute bottom-0 left-[calc(62.5%)] h-22 w-8 bg-primary/20"></div>
                      <div className="absolute bottom-0 left-[calc(62.5%)] h-18 w-8 bg-primary"></div>
                      
                      <div className="absolute bottom-0 left-[calc(75%)] h-24 w-8 bg-primary/20"></div>
                      <div className="absolute bottom-0 left-[calc(75%)] h-20 w-8 bg-primary"></div>
                      
                      <div className="absolute bottom-0 left-[calc(87.5%)] h-20 w-8 bg-primary/20"></div>
                      <div className="absolute bottom-0 left-[calc(87.5%)] h-16 w-8 bg-primary"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-primary/10 text-primary font-medium px-3 py-1 rounded-full mb-4">
                /04
              </div>
              <h2 className="text-3xl font-bold mb-4">InsightLens</h2>
              <p className="text-gray-300 mb-6">
                InsightLens provides detailed campaign analytics and actionable insights, enabling continuous 
                improvement of engagement strategies and measuring compliance adherence.
              </p>
              <button 
                onClick={() => login()}
                className="bg-primary hover:bg-primary/80 text-white font-medium px-6 py-2 rounded-lg transition"
              >
                View Analytics
              </button>
            </div>
          </div>
          
          {/* InteractCraft Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24 mb-6">
            <div>
              <div className="inline-block bg-primary/10 text-primary font-medium px-3 py-1 rounded-full mb-4">
                /05
              </div>
              <h2 className="text-3xl font-bold mb-4">InteractCraft AI</h2>
              <p className="text-gray-300 mb-6">
                InteractCraft AI delivers innovative ways to collaborate with HCPs through virtual advisory boards,
                moderated discussion forums, and Delphi consensus-building surveys, enabling deeper engagement.
              </p>
              <button 
                onClick={() => login()}
                className="bg-primary hover:bg-primary/80 text-white font-medium px-6 py-2 rounded-lg transition"
              >
                Launch Engagement
              </button>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm">Virtual Advisory Boards</span>
                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">Discussion Forums</span>
                <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm">Delphi Surveys</span>
              </div>
            </div>
            <div className="bg-background-card rounded-xl p-6 shadow-lg">
              <div className="overflow-hidden rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Active Engagements</h3>
                  <span className="text-sm text-gray-400">Last 30 Days</span>
                </div>
                <div className="bg-background-lighter rounded-lg p-4">
                  <div className="border-b border-gray-700 pb-3 mb-3">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="material-icons text-blue-400 mr-2">groups</span>
                        <span className="font-medium">Oncology Treatment Pathways</span>
                      </div>
                      <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">Advisory Board</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>8 participants</span>
                      <span>Scheduled: Apr 20, 2025</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-700 pb-3 mb-3">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="material-icons text-green-400 mr-2">forum</span>
                        <span className="font-medium">Next-Gen Oncology Therapies</span>
                      </div>
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Forum</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>18 participants</span>
                      <span>7 topics • 42 replies</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-700 pb-3 mb-3">
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="material-icons text-purple-400 mr-2">how_to_vote</span>
                        <span className="font-medium">Lung Cancer Treatment Guidelines</span>
                      </div>
                      <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">Delphi Survey</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Round 2 of 3</span>
                      <div className="flex items-center">
                        <span className="mr-2">Consensus:</span>
                        <div className="w-20 h-1.5 bg-background-dark rounded-full">
                          <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                        <span className="ml-2">72%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-4">
                    <button 
                      onClick={() => login()}
                      className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center"
                    >
                      View All Engagements
                      <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-background-lighter">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Transform Your HCP Digital Engagement Today</h2>
          <p className="text-xl text-gray-300 mb-8">
            Sign up for Xupra's platform today and unlock the full potential of AI-powered HCP engagement.
          </p>
          <button 
            onClick={() => login()}
            className="bg-primary hover:bg-primary/80 text-white font-medium px-8 py-3 rounded-lg transition text-lg"
          >
            Register Your Organization Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-background-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Logo size="sm" />
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Xupra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
