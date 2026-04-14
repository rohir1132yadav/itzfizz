import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TITLE = "WELCOME ITZFIZZ";

const METRICS = [
  { value: "58%", label: "Increase in pick up point use", tone: "lime" },
  { value: "27%", label: "Increase in pick up point use", tone: "charcoal" },
  { value: "23%", label: "Decreased in customer phone calls", tone: "blue" },
  { value: "40%", label: "Decreased in customer phone calls", tone: "orange" }
];

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const stats = statsRef.current;
    const road = roadRef.current;
    const car = carRef.current;

    if (!section || !headline || !stats || !road || !car) return;

    const ctx = gsap.context(() => {
      const letters = headline.querySelectorAll(".hero-letter");
      const statCards = stats.querySelectorAll(".metric-card");
      const scrollDistance = 1700;

      gsap.set(letters, { y: 22, opacity: 0 });
      gsap.set(statCards, { y: 26, opacity: 0, scale: 0.96 });
      gsap.set(car, { xPercent: 0, opacity: 0, scale: 0.9, rotate: -2 });
      gsap.set(road, { scaleX: 0.94, opacity: 0.65 });
      gsap.set(road, { "--split": "82%" });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(letters, {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.72
        })
        .to(
          road,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.85
          },
          "-=0.45"
        )
        .to(
          car,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1
          },
          "-=0.55"
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1.05,
          pin: true,
          anticipatePin: 1
        }
      });

      scrollTl
        .to(car, { xPercent: -330, rotate: 2.5, ease: "none", duration: 1 }, 0)
        .to(road, { "--split": "8%", ease: "none", duration: 1 }, 0)
        .to(headline, { yPercent: -22, ease: "none", duration: 1 }, 0)
        .to(stats, { yPercent: -16, ease: "none", duration: 1 }, 0)
        .to(statCards[0], { y: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 0.28 }, 0.08)
        .to(statCards[1], { y: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 0.28 }, 0.26)
        .to(statCards[2], { y: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 0.28 }, 0.54)
        .to(statCards[3], { y: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 0.28 }, 0.74);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-wrapper relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="hero-noise" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
        <div className="z-10 w-full">
          <h1
            ref={headlineRef}
            className="hero-title mb-10 font-semibold uppercase text-white"
            aria-label={TITLE}
          >
            {TITLE.split("").map((char, idx) => (
              <span key={`${char}-${idx}`} className="hero-letter inline-block">
                {char === " " ? "\u00A0\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        <div ref={statsRef} className="metrics-wrap z-18">
          <div className="metrics-row metrics-top">
            {METRICS.slice(0, 2).map((metric, idx) => (
              <article key={`${metric.value}-${idx}`} className={`metric-card metric-${metric.tone}`}>
                <p className="metric-value">{metric.value}</p>
                <p className="metric-label">{metric.label}</p>
              </article>
            ))}
          </div>
          <div className="metrics-row metrics-bottom">
            {METRICS.slice(2, 4).map((metric, idx) => (
              <article key={`${metric.value}-${idx}`} className={`metric-card metric-${metric.tone}`}>
                <p className="metric-value">{metric.value}</p>
                <p className="metric-label">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div ref={roadRef} className="road-strip relative mt-3 h-40 overflow-hidden rounded-sm sm:h-48">
          <p className="road-label pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-5xl font-black uppercase tracking-[0.18em] text-black sm:text-7xl lg:text-8xl">
            WELCOME
          </p>
          <img
            ref={carRef}
            src="/car-top.svg"
            alt="Car top view"
            className="car-asset absolute left-[100%] top-1/2 w-[20rem] -translate-y-1/2 sm:w-[24rem] lg:w-[30rem]"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
