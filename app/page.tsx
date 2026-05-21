import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroAboutStack from "../components/HeroAboutStack";
import StackMarquee from "../components/StackMarquee";
import ProjectsSection from "@/components/projects";
import ContactSection from "../components/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <Header />
      <main className="mx-auto max-w-10xl px-6 py-16 lg:px-10">
        <div className="relative overflow-visible py-4 sm:py-6">
          <div className="mx-auto w-full max-w-6xl rounded-[2rem] border border-black/5 bg-white/95 px-6 py-8 backdrop-blur-xl transition will-change-transform dark:border-white/10 sm:px-8 md:px-10">
            <HeroAboutStack />
          </div>
        </div>

        <div className="relative overflow-visible py-3 sm:py-4 mt-[50px]">
          <div className="mx-auto w-full max-w-5xl rounded-[2rem] border border-black/5 bg-white/95 px-5 py-3 backdrop-blur-xl transition will-change-transform dark:border-white/10 sm:px-7 md:px-8">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                i love animation by the way 
              </p>
              <div className="w-full max-w-2xl">
                <div
                  style={{ width: "100%", height: 200, minHeight: 30 }}
                  dangerouslySetInnerHTML={{
                    __html:
                      '<lottie-player src="/Gibli%20Tribute.json" background="transparent" speed="1" loop autoplay style="width:100%;height:100%;"></lottie-player>',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-visible py-4 sm:py-6 mt-[10px]">
          <div className="mx-auto w-full max-w-6xl rounded-[2rem] border border-black/5 bg-white/95 px-6 py-8 backdrop-blur-xl transition will-change-transform dark:border-white/10 sm:px-8 md:px-10">
            <StackMarquee />
          </div>
        </div>
        <div>
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </div>
      </main>
    </div>
  );
}
