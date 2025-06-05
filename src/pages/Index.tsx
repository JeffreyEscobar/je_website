import { Mail, Linkedin, ExternalLink, Cpu, LayoutDashboard, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePicture from "@/assets/profile.jpg"; // Add your profile image here
import FredLogo from "@/assets/FRED.png"; // Add FRED logo
import styled from "styled-components";
import { getSafeExternalLinkProps, isValidEmail, contactRateLimiter } from "@/lib/security";

// Styled components for name styling
const FirstName = styled.span`
  color: #1F2937;    /* Dark Slate */
  font-weight: 500;  /* Medium */
`;

const LastName = styled.span`
  /* Subtle gradient flair */
  background: linear-gradient(to right, #f97316, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;             /* Standard property for better browser support */
  font-weight: 700;  /* Bold */
`;

// Role/title line
const TitleLine = styled.p`
  margin-top: 12px;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
  color: #4B5563;
  font-weight: 500;
`;

// Decorative divider
const Divider = styled.div`
  width: 60px;
  height: 2px;
  background: linear-gradient(to right, #f97316, #f59e0b);
  margin: 8px auto;
`;

// Section 4: Description Text
const Description = styled.p`
  font-size: 1.125rem;       /* 18px */
  font-weight: 500;          /* Harmonize with headings/CTAs */
  line-height: 1.75;         /* Airier legibility */
  max-width: 640px;          /* Constrain width */
  margin: 24px auto 36px;    /* 24px above, 36px below */
  text-align: center;
  color: #4B5563;            /* Muted slate gray */
`;

// Section 5: CTA Buttons Container
const CTAContainer = styled.div`
  display: flex;
  flex-direction: row;       /* Force horizontal layout */
  flex-wrap: nowrap;         /* Prevent buttons from stacking */
  justify-content: center;
  gap: 20px;                 /* Space between buttons */
  margin-top: 24px;
  
  @media (max-width: 640px) {
    padding-left: 32px;      /* Increased space from screen edges */
    padding-right: 32px;
    gap: 16px;               /* Reduce gap between buttons */
    
    /* Make buttons more compact */
    a {
      font-size: 0.875rem !important;  /* Smaller text */
      padding: 8px 16px !important;    /* Reduced padding */
    }
  }
`;

// Contact Section Button Container
const ContactButtonContainer = styled.div`
  display: flex;
  flex-direction: row;       /* Force horizontal layout */
  flex-wrap: nowrap;         /* Prevent buttons from stacking */
  gap: 24px;                 /* gap-6 equivalent */
  justify-content: center;
  align-items: center;
  
  @media (max-width: 640px) {
    padding-left: 32px;      /* Increased space from screen edges */
    padding-right: 32px;
    gap: 16px;               /* Reduce gap between buttons */
    
    /* Make buttons more compact */
    button {
      font-size: 0.875rem !important;  /* Smaller text */
      padding: 8px 16px !important;    /* Reduced padding */
    }
  }
`;

// LinkedIn Button
const LinkedInButton = styled.a`
  background-color: #0a66c2;
  color: #fff;
  border-radius: 9999px;            /* Pill shape */
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;                         /* Icon + text spacing */
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #004182;
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(10, 102, 194, 0.25);
  }
`;

// Profile Image Container with radial glow
const ProfileImageContainer = styled.div`
  position: relative;
  width: 256px;                      /* w-64 equivalent */
  height: 256px;                     /* h-64 equivalent */
  margin: 0 auto 32px auto;         /* mx-auto mb-8 equivalent */
  
  /* Subtle orange radial glow behind the photo */
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      rgba(234, 88, 12, 0.15) 0%,
      transparent 60%
    );
    z-index: -1;
  }
`;

// Project Logo styling
const ProjectLogo = styled.img`
  display: block;
  max-width: 200px;                  /* Appropriate size for project title */
  height: auto;
  margin-bottom: 8px;                /* Match the h3's bottom margin */
  transition: all 0.3s ease;
  
  /* Inherit parent's hover color transition */
  filter: brightness(1);
  
  .group:hover & {
    filter: brightness(1.1) saturate(1.2);
  }
`;

// Section Title styling
const SectionTitle = styled.h2`
  font-size: 2.5rem;                 /* text-4xl equivalent */
  /* Subtle gradient flair */
  background: linear-gradient(to right, #f97316, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;             /* Standard property for better browser support */
  letter-spacing: 0.5px;             /* Add letter spacing */
  font-weight: 700;                  /* Increase weight to bold */
  margin-bottom: 1rem;               /* mb-4 equivalent */
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 3rem;                 /* md:text-5xl equivalent */
    margin-bottom: 2rem;             /* md:mb-8 equivalent */
  }
`;

// Project Section Header
const ProjectSectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;               /* mb-16 equivalent */
  
  h2 {
    margin-bottom: 8px;              /* Reduced spacing: 8-12px */
  }
`;

// Project Card Container
const ProjectCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 48px;                /* Increased horizontal padding */
  max-width: 800px;                  /* Constrained width */
  margin: 0 auto;                    /* Center the card */
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid #D1D5DB;
  border-radius: 1rem;
  transition: all 0.5s ease;
  
  &:hover {
    border-color: rgba(234, 88, 12, 0.5);
    transform: scale(1.05);
    box-shadow: 0 25px 50px rgba(234, 88, 12, 0.2);
  }
`;

// Project Content Wrapper
const ProjectContent = styled.div`
  text-align: center;
  width: 100%;
  
  .project-description {
    color: #6B7280;
    line-height: 1.6;
    margin: 16px 0;
    text-align: center;
  }
  
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin: 16px 0;
    text-align: center;
  }
  
  .view-link {
    text-align: center;
  }
`;

// Project Divider
const ProjectDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #E5E7EB;
  margin: 8px 0;
`;

// Update ProjectLogo with margin
const ProjectLogoUpdated = styled.img`
  display: block;
  max-width: 300px;                  /* Enlarged from 200px for greater prominence */
  height: auto;
  margin: 0 auto 8px auto;           /* Center and add bottom margin */
  transition: all 0.3s ease;
  filter: brightness(1);
  
  &:hover {
    filter: brightness(1.1) saturate(1.2);
  }
`;

const Index = () => {
  const handleEmailClick = () => {
    const email = "jeffreyescobar280@gmail.com";
    
    if (!isValidEmail(email)) {
      console.error("Invalid email address");
      return;
    }
    
    if (!contactRateLimiter.isAllowed('email')) {
      alert("Too many contact attempts. Please wait before trying again.");
      return;
    }
    
    window.location.href = `mailto:${email}`;
  };

  const handleLinkedInClick = () => {
    const linkedinUrl = "https://linkedin.com/in/jeffreyiescobar";
    
    try {
      const linkProps = getSafeExternalLinkProps(linkedinUrl);
      
      if (!contactRateLimiter.isAllowed('linkedin')) {
        alert("Too many contact attempts. Please wait before trying again.");
        return;
      }
      
      window.open(linkProps.href, linkProps.target);
    } catch (error) {
      console.error("Invalid LinkedIn URL");
    }
  };

  const handleViewProjectClick = () => {
    window.open('https://github.com/JeffreyEscobar', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Profile Avatar */}
            <ProfileImageContainer>
              <div className="absolute inset-0 bg-white rounded-full animate-pulse border-4 border-gray-300" style={{
                animation: 'borderPulse 3s ease-in-out infinite'
              }}></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src={profilePicture} 
                  alt="Jeffrey Escobar Profile" 
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </ProfileImageContainer>

            {/* Name and Title */}
            <div className="space-y-5">
              <h1 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-gray-700 bg-clip-text text-transparent animate-fade-in leading-normal pb-2 whitespace-nowrap">
                <FirstName>Jeffrey</FirstName> <LastName>Escobar</LastName>
              </h1>
              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <TitleLine>SWE | Founder | Technologist</TitleLine>
                <Divider />
              </div>
              <Description className="animate-fade-in" style={{ animationDelay: '1s' }}>
                Driven by vision. Built on discipline. Engineering elegant systems with clarity and control.
              </Description>
            </div>

            {/* CTA Buttons */}
            <CTAContainer className="animate-fade-in" style={{ animationDelay: '1.5s', justifyContent: 'center' }}>
              <LinkedInButton
                href="https://linkedin.com/in/jeffreyiescobar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </LinkedInButton>
            </CTAContainer>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <ProjectSectionHeader>
              <SectionTitle>
                Featured Project
              </SectionTitle>
              <Description>
                Showcasing my latest work
              </Description>
            </ProjectSectionHeader>

            <div className="max-w-4xl mx-auto">
              <ProjectCardContainer className="group">
                <ProjectContent>
                  <ProjectLogoUpdated 
                    src={FredLogo} 
                    alt="FRED AI Visualizer Logo"
                    loading="lazy"
                    decoding="async"
                  />
                  <ProjectDivider />
                  <p className="project-description">
                    A powerful web app that transforms raw Federal Reserve Economic Data (FRED) into clear, interactive insights. It pulls live data directly from FRED and uses the latest GPT-4o model to deliver smart, real-time analysis. With a user-friendly interface, accurate charts for every dataset, and an integrated AI chatbot that answers questions about any FRED data, it makes economic understanding faster, sharper, and more accessible.


                  </p>
                  <div className="tech-tags">
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm">JavaScript</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm">Go</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm">D3.js</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm">Chart.js</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm">Tailwind CSS</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm">FRED API</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm">OpenAI API</span>
                  </div>
                  <div className="view-link">
                    <Button
                      onClick={handleViewProjectClick}
                      variant="ghost"
                      className="text-orange-600 hover:text-gray-900 hover:bg-orange-500/20 p-0 h-auto font-semibold group/btn"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </ProjectContent>
              </ProjectCardContainer>
            </div>
          </div>
        </section>

        {/* Skills/About Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SectionTitle>
              About Me
            </SectionTitle>
            <Description>
              I'm a software engineer with the mind of a founder. Driven by vision. Disciplined by detail. I learned to code because I couldn't stand watching good ideas die in my head. Now I bring them to life with precision and intent. I live by one principle: action without a plan is a nightmare. A plan without action is just a daydream. I focus on building with purpose, staying clear on what matters, and letting the results speak for themselves.
            </Description>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-300 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl w-fit mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Engineering</h3>
                <p className="text-gray-600">End-to-end software systems built with precision, speed, and modern frameworks.</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-300 hover:border-orange-500/50 transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.2s' }}>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl w-fit mx-auto mb-4">
                  <LayoutDashboard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Thinking</h3>
                <p className="text-gray-600">Designing clean, intuitive interfaces rooted in real user behavior.</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-300 hover:border-orange-500/50 transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.4s' }}>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl w-fit mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Exploration</h3>
                <p className="text-gray-600">Pushing boundaries with new tools, technologies, and smarter solutions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SectionTitle>
              Let's Connect
            </SectionTitle>
            <Description>
              Open to meaningful collaborations and new opportunities. If something resonates, feel free to reach out!
            </Description>
            
            <ContactButtonContainer>
              <Button
                onClick={handleLinkedInClick}
                className="bg-[#0a66c2] hover:bg-[#004182] text-white px-12 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 text-lg"
              >
                <Linkedin className="w-6 h-6" />
                LinkedIn
              </Button>
              <Button
                onClick={handleEmailClick}
                variant="outline"
                className="border-2 border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-12 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-500/30 text-lg"
              >
                <Mail className="w-6 h-6" />
                Email Me
              </Button>
            </ContactButtonContainer>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-gray-300/50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-500">
              Jeffrey Escobar © 2025. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
