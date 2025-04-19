import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DashboardHeader from '@/components/dashboard-header';
import { Badge } from '@/components/ui/badge';
import Sidebar from '@/components/sidebar';

export default function AboutPage() {
  const founders = [
    {
      name: "Ocean Niu",
      title: "Co-Founder & CEO",
      bio: "Ocean brings extensive experience in healthcare technology and pharmaceutical marketing. Their vision for transforming HCP engagement drove the creation of Xupra.",
      avatar: null, // No avatar provided, will use initials
    },
    {
      name: "GP Shangari",
      title: "Co-Founder & CTO",
      bio: "With a background in AI and medical informatics, GP leads the technical development of Xupra's innovative platform features and geographic analytics systems.",
      avatar: null, // No avatar provided, will use initials
    }
  ];

  const coreValues = [
    {
      title: "Innovation",
      description: "Pioneering new approaches to healthcare professional engagement through cutting-edge AI and data analytics.",
      icon: "lightbulb",
      color: "bg-blue-500/20 text-blue-400"
    },
    {
      title: "Precision",
      description: "Delivering targeted, relevant content to healthcare professionals based on accurate data and sophisticated algorithms.",
      icon: "precision_manufacturing",
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      title: "Collaboration",
      description: "Fostering meaningful connections between pharmaceutical companies and healthcare professionals.",
      icon: "handshake",
      color: "bg-green-500/20 text-green-400"
    },
    {
      title: "Integrity",
      description: "Maintaining the highest standards of ethics and data privacy in all our operations.",
      icon: "shield",
      color: "bg-amber-500/20 text-amber-400"
    }
  ];

  const timeline = [
    {
      year: "2023",
      event: "Concept Development",
      description: "Initial ideation and market research for Xupra platform."
    },
    {
      year: "2024",
      event: "Platform Launch",
      description: "Official release of Xupra with core modules for HCP engagement."
    },
    {
      year: "2025",
      event: "Global Expansion",
      description: "Extending platform capabilities to support international markets with multi-language support."
    }
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar />
      {/* Main content area with proper margin on medium screens and up */}
      <div className="flex-1 overflow-y-auto bg-background-dark md:ml-64">
        <div className="w-full p-4 md:p-8">
          <DashboardHeader 
            title="About Xupra" 
            description="AI-powered healthcare professional engagement platform"
            showBackButton 
          />

          {/* Mission Statement */}
          <div className="mt-6 relative">
            <div className="bg-primary/10 p-6 md:p-10 rounded-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Our Mission</h2>
                <p className="text-lg md:max-w-3xl">
                  Xupra transforms pharmaceutical communication through intelligent geographic analytics and 
                  interactive networking, empowering companies to build meaningful relationships with 
                  healthcare professionals around the world.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-sm py-1">AI-Powered</Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-sm py-1">Geographic Analytics</Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-sm py-1">HCP Engagement</Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-sm py-1">Pharmaceutical Innovation</Badge>
                </div>
              </div>
              <div className="absolute top-0 right-0 opacity-5 md:opacity-10">
                <span className="material-icons text-[180px] md:text-[250px] text-primary">psychology</span>
              </div>
            </div>
          </div>

          {/* Founders Section */}
          <h2 className="text-2xl font-bold mt-10 mb-6">Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {founders.map((founder, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      {founder.avatar ? (
                        <AvatarImage src={founder.avatar} alt={founder.name} />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary text-xl">
                          {founder.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <CardTitle>{founder.name}</CardTitle>
                      <CardDescription className="text-primary font-medium mt-1">
                        {founder.title}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{founder.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Core Values */}
          <h2 className="text-2xl font-bold mt-10 mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${value.color} flex items-center justify-center mb-3`}>
                    <span className="material-icons">{value.icon}</span>
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timeline */}
          <h2 className="text-2xl font-bold mt-10 mb-6">Our Journey</h2>
          <div className="relative border-l-2 border-primary/20 ml-4 pl-8 pb-6">
            {timeline.map((item, index) => (
              <div key={index} className="mb-8 relative">
                <div className="absolute -left-12 w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div className="bg-background-lighter p-5 rounded-lg border border-border">
                  <div className="flex items-center mb-2">
                    <Badge className="bg-primary/20 text-primary mr-3">{item.year}</Badge>
                    <h3 className="text-lg font-semibold">{item.event}</h3>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <h2 className="text-2xl font-bold mt-10 mb-6">Connect With Us</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <span className="material-icons text-primary">email</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">contact@xupra.ai</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <span className="material-icons text-primary">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Headquarters</h3>
                    <p className="text-muted-foreground">Tokyo, Japan</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <span className="material-icons text-primary">language</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Website</h3>
                    <p className="text-muted-foreground">www.xupra.ai</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-12 mb-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Xupra. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}