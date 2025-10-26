// Import all the new section components
import HeroSection from './HeroSection';
import ShowcaseSection from './ShowcaseSection';
import JobBoardSection from './JobBoardSection';
import CtaBanner from './CtaBanner';
import FinalCallToAction from './FinalCallToAction';
import TestimonialsSection from './TestimonialsSection';


function HomePage() {
    return (
        // mt-20 pushes content below the fixed navbar
        // CHANGED: bg-slate-900 to bg-black for page consistency
        <main className="flex-grow  overflow-x-hidden bg-black">
            <HeroSection />
            <ShowcaseSection />
            <JobBoardSection />
            <CtaBanner />
            {/* <FinalCallToAction /> */}
            <TestimonialsSection />

        </main>
    );
}

export default HomePage;