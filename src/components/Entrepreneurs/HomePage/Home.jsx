// Import all the new section components
import HeroSection from './HeroSection';
import ShowcaseSection from './ShowcaseSection';
import JobBoardSection from './JobBoardSection';
import CtaBanner from './CtaBanner';
import FinalCallToAction from './FinalCallToAction';


function HomePage() {
    return (
        // mt-20 pushes content below the fixed navbar
        <main className="flex-grow  overflow-x-hidden bg-slate-900">
            <HeroSection />
            <ShowcaseSection />
            <JobBoardSection />
            <CtaBanner />
            <FinalCallToAction />
        </main>
    );
}

export default HomePage;