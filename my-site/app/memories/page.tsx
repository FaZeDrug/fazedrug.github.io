type Memory = {
  date: string;
  place: string;
  alt: string;
  src?: string;
  ratio?: string;
};

const memoryYears: Array<{ year: string; memories: Memory[] }> = [
  {
    year: "2026",
    memories: [
      {
        date: "August 26th",
        place: "San Francisco, CA (GitHub HQ)",
        alt: "Natasha at GitHub HQ in San Francisco",
        src: "/memories/2026/github-hq.jpg",
        ratio: "9 / 16",
      },
      {
        date: "August 23rd",
        place: "San Francisco, CA",
        alt: "sexy girl at yc sign",
        src: "/memories/2026/ycsign.JPG",
        ratio: "3 / 4",
      },
      {
        date: "May 31st",
        place: "La Jolla, CA",
        alt: "Memory from La Jolla",
        src: "/memories/2026/squadstairs.jpeg",
        ratio: "3 / 4",
      },
      {
        date: "May 31st",
        place: "La Jolla, CA",
        alt: "Memory from La Jolla",
        src: "/memories/2026/natbear.jpeg",
        ratio: "4 / 3",
      },
      
      {
        date: "February 6th",
        place: "San Diego, CA",
        alt: "Memory from San Diego",
        src: "/memories/2026/lafayette.jpeg",
        ratio: "4 / 3",
      },
      {
        date: "January 15th",
        place: "Big Bear Lake, CA",
        alt: "Memory from Big Bear Lake",
        src: "/memories/2026/bigbeargirlies.jpeg",
        ratio: "3 / 4",
      },
      //placeholders BELOW! - KEEP THIS COMMENT (also If src is missing, it shows a placeholder with whatever ratio you set, like "9 / 16" or "4 / 3" and when it has a pic, the ratio don't matter.)
      // { 
      //   date: "November 15th, 2024",
      //   place: "Philadelphia, PA",
      //   alt: "Memory from Philadelphia",
      //   ratio: "9 / 16",
      // },
      // {
      //   date: "September 30th, 2024",
      //   place: "San Francisco, CA",
      //   alt: "Memory from San Francisco",
      //   ratio: "4 / 3",
      // },
      // {
      //   date: "June 16th, 2024",
      //   place: "New York, NY",
      //   alt: "Memory from New York",
      //   ratio: "4 / 3",
      // },
    ],
  },
  {
    year: "2025",
    memories: [
      {
        date: "November 22nd",
        place: "La Jolla, CA",
        alt: "ALLOCATIONNN",
        src: "/memories/2025/allocgirls.JPG",
        ratio: "4 / 3",
      },
    ],
  },
  {
    year: "2024",
    memories: [
      {
        date: "December 24th",
        place: "Escondido, CA",
        alt: "Secret Santa 2024",
        src: "/memories/2024/owomas2024.JPG",
        ratio: "4 / 3",
      },
    ],
  },
  {
    year: "2023",
    memories: [
      {
        date: "December 14th",
        place: "La Jolla, CA",
        alt: "Praying for CSE 21 Final",
        src: "/memories/2023/cse21final.JPG",
        ratio: "4 / 3",
      },
    ],
  },
  {
    year: "2022",
    memories: [
      {
        date: "2022",
        place: "Berkeley, CA",
        alt: "Cal Day 2022",
        src: "/memories/2022/briberk.jpg",
        ratio: "4 / 3",
      },
    ],
  },
];

export default function MemoriesPage() {
  return (
    <main className="memories-page" aria-label="Memories">
      <h1 className="memories-title">memories</h1>
      <p className="memories-description"><i>my beautiful life</i></p>

      {memoryYears.map(({ year, memories }) => (
        <section className="memories-year" key={year} aria-labelledby={`memories-${year}`}>
          <h2 id={`memories-${year}`}>{year}</h2>

          <div className="memories-grid">
            {memories.map((memory) => (
              <figure className="memory-card" key={`${memory.date}-${memory.place}`}>
                {memory.src ? (
                  <img src={memory.src} alt={memory.alt} loading="lazy" />
                ) : (
                  <div className="memory-placeholder" style={{ aspectRatio: memory.ratio }} aria-label={memory.alt} />
                )}

                <figcaption>
                  <span>{memory.date}</span>
                  <span aria-hidden="true"> - </span>
                  <em>{memory.place}</em>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
