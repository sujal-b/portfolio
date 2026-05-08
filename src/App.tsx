import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ActivitySection from './components/sections/ActivitySection';
import EducationSection from './components/sections/EducationSection';
import CertificationsSection from './components/sections/CertificationsSection';
import ContactSection from './components/sections/ContactSection';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import PageIntro from './components/ui/PageIntro';

export default function App() {
  return (
    <>
      <CustomCursor />
      <PageIntro />
      <div id="scroll-container" className="noise">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ActivitySection />
          <EducationSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
