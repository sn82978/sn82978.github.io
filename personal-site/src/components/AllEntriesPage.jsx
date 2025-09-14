import React, { useState } from "react";

const FILTERS = ["Research", "Projects"];

const BULLET_POINTS = {
  "Constraining Cosmic-Ray Transport with Observational Data": {
    description: "My intro to the world of research! I used libraries like pandas and numpy to do data analysis on large datasets. My role focused on creating a plot using a variety of astronomy and data science libraries showing the effective diffusivity coefficient for all galaxies in the Hubble COS-Halos dataset.",
    links: [
      { title: "Poster at AAS", url: "https://aas240-aas.ipostersessions.com/Default.aspx?s=39-11-68-61-92-B5-5B-4D-65-27-D7-9C-C2-2B-9E-B1#stay" },
      { title: "Published Paper", url: "https://academic.oup.com/mnras/article/521/2/2477/7070735" },
      { title: "Github Repository", url: "https://github.com/sn82978/Cosmic-Ray-Transport-Plots" }
    ]
  },
  "Statistical Analysis and Machine Learning to Detect Drift v. Anti-Drift": {
    description: "At the Rose Lab, I studied whether drift or selection drives evolution by analyzing SNPs across generations of fruit flies, training 220 Random Forest models to refine the p-value threshold to 0.000218. I also applied UMAP for unsupervised analysis to explore relationships between SNP frequency changes and evolutionary trajectories, with the project funded by Calit2.",
    links: [
      { title: "Slides from Oral Presentation at Calit2 2025", url: "https://docs.google.com/presentation/d/1aWlFPqgMO3BhaZnXAVgsTnJD6uUTx6W7gs6-XFdm-R8/edit?usp=sharing" },
      { title: "Poster at UROP 2025", url: "https://drive.google.com/file/d/1jpDVq2Ie3iVeWhEsMzWQTm08o821e0iy/view?usp=drive_link" },
      { title: "Github Repository", url: "https://github.com/rose-mueller-labs/snp-data" }
    ]
  },
  "Tiling: Computer Vision to Detect Fruit Fly Eggs": {
    description: "This ongoing project applies machine learning to count fruit fly eggs in grid-like images by developing a recursive tiling technique that splits images into 75x75 pixel tiles for more accurate small-object detection. The model predicts egg counts at the tile level, reconstructs them into cap counts, and then sums across the grid, with this work winning #1 at the UROP 2025 Group Oral Speech Competition and funded by UCI UROP.",
    links: [
      { title: "Slides from Oral Presentation (Won) at UROP 2025", url: "https://drive.google.com/file/d/1tDlDDwiDEWAMkyRW2rBC2F8td4dDidTX/view?usp=sharing" },
      { title: "Github Repository", url: "https://github.com/sn82978/CNN-Classifier" }
    ]
  },
  "Uncovering the Typing and Distribution of Code Clones Across Forks of Open Source Microservice Repositories": {
    description: "Code reuse in microservice development improves efficiency but creates challenges with maintaining cloned code, making clone detection important yet difficult with current tools. To address this, we evaluated general-purpose and code-specific LLMs on 26 open-source repositories and their forks, finding that they achieved near-human accuracy in identifying clone distribution and performed well at distinguishing clone subtypes.",
    links: [
      { title: "Github Repository", url: "https://github.com/Camithilwen/Code-Cloning-Analysis" }
    ]
  },
  "UI for Tiling": {
    description: "A I UI created to help easily create a training dataset for machine learning models using the Tiling technique. Instructions are on the README.md and upload your images directory and start labelling. The idea is to label each square, the name of the file is modified, and then to train, the dataset is set up such that the class is extracted directly from the file's name.",
    links: [
      { title: "Github Repository", url: "https://github.com/sn82978/Classifier-Site" }
    ]
  },
  "AI@UCI: Workshops": {
    description: "My workshops as an AI@UCI executive have taught undergraduate and graduate students. I have taught about vision transformers, my own research at Rose Labs, and how to use PyTorch by making a simple PyTorch classifier.",
    links: [
      { title: "Github Repository", url: "https://github.com/Artificial-Intelligence-UC-Irvine/2024-Workshops" }
    ]
  },
  "Sentiment Analysis for Financial News": {
    description: "Using a dataset of Twitter financial headlines and comments, I built a sentiment classifier that labels headlines as positive, negative, or neutral based on filtered user comments, removing bot and irrelevant posts. I fine-tuned a BERT model with Hugging Face Transformers, queried data with SQL, and deployed the model on Hugging Face, where it has over 6k downloads.",
    links: [
      { title: "Hugging Face Model Card", url: "https://huggingface.co/snoneeightfive/financial-news-headers-sentiment-analysis" }
    ]
  },
  "HackMIT: ActsAI": {
    description: "At HackMIT 2024, my team and I built a website that matches users to therapists through a chatbot, integrating features like web scraping to gather therapist data and a service to detect self-harming behaviors that could trigger emergency alerts. I focused on fine-tuning and deploying the LLM with Modal, though the site ultimately did not deploy successfully.",
    links: [
      { title: "Github Repository", url: "https://github.com/PatelPurav05/ActsAI" }
    ]
  },
  "Boiling Bad": {
    description: "Boiling Bad-and Bottom Bun is a side project my roommate and I built to showcase our recipes and potion videos through a minimalistic website with a 2000s-inspired UI. I focused on routing and video embedding, ensuring every page was accessible and that the media displayed seamlessly.",
    links: [
      { title: "Deployed Site", url: "https://sn82978.github.io/BOILING-BAD/" },
      { title: "Github Repository", url: "https://github.com/sn82978/BOILING-BAD" }
    ]
  },
  "Impactful Updates": {
    description: "Impactful Updates is a website meant to connect people to their representatives and exercise their politial power--expressing what they wish to see in their state to the people who represent them.",
    links: [
      { title: "Deployed Site", url: "https://impactful-updates.vercel.app/" },
      { title: "Github Repository", url: "https://github.com/sn82978/Impactful-Updates" }
    ]
  }
};

// Sample entries data
const SAMPLE_ENTRIES = [
  {
    title: "Constraining Cosmic-Ray Transport with Observational Data",
    category: "Research",
    type: "Computational Astrophysics",
    year: "2022",
    cover: "mnras-plot.png"
  },
  {
    title: "Statistical Analysis and Machine Learning to Detect Drift v. Anti-Drift",
    category: "Research", 
    type: "Machine Learning",
    year: "2024",
    cover: "IMG_4926.jpeg"
  },
  {
    title: "Tiling: Computer Vision to Detect Fruit Fly Eggs",
    category: "Research",
    type: "Computer Vision",
    year: "2025",
    cover: "MLFFPic.png"
  },
  {
    title: "Uncovering the Typing and Distribution of Code Clones Across Forks of Open Source Microservice Repositories",
    category: "Research",
    type: "Software Engineering",
    year: "2025",
    cover: "db.png"
  },
  {
    title: "UI for Tiling",
    category: "Projects",
    type: "Web Development",
    year: "2025",
    cover: "classifier-site-sample.png"
  },
  {
    title: "AI@UCI: Workshops",
    category: "Projects",
    type: "Teaching",
    year: "2025",
    cover: "IMG_8906.jpeg"
  },
  {
    title: "Sentiment Analysis for Financial News",
    category: "Projects",
    type: "Machine Learning",
    year: "2024",
    cover: "sent.png"
  },
  {
    title: "HackMIT: ActsAI",
    category: "Projects",
    type: "Hackathon",
    year: "2024",
    cover: "sd.png"
  },
  {
    title: "Boiling Bad",
    category: "Projects",
    type: "Web Development",
    year: "2024",
    cover: "boiling.png"
  },
  {
    title: "Impactful Updates",
    category: "Projects",
    type: "Web Development",
    year: "2024",
    cover: "imp_upd.png"
  }
];

function Footer() {
  return (
    <div style={{
      textAlign: "center",
      color: "#b3b3b3",
      padding: "40px 0",
      fontSize: 14
    }}>
      © 2025 Shreya Nakum. All rights reserved.
    </div>
  );
}

function AllEntriesPage() {
  const [filter, setFilter] = useState(FILTERS[0]);
  const filteredEntries = SAMPLE_ENTRIES.filter(e => e.category === filter);

  return (
    <div style={{ 
      background: "linear-gradient(180deg, #1f1f1f 0%, #121212 100%)", 
      minHeight: "100vh",
      color: "#fff"
    }}>
      {/* Header */}
      <div style={{ 
        padding: "32px", 
        borderBottom: "1px solid #333"
      }}>
        <h1 style={{ 
          fontSize: 48, 
          fontWeight: 700, 
          margin: "0 0 16px 0",
          background: "linear-gradient(135deg, #1db954 0%, #1ed760 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Shreya Nakum
        </h1>
        
        {/* Filter Buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "12px 24px",
                borderRadius: 25,
                border: "none",
                background: filter === f ? "#1db954" : "rgba(255,255,255,0.1)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s ease",
                backdropFilter: "blur(10px)"
              }}
              onMouseEnter={(e) => {
                if (filter !== f) {
                  e.target.style.background = "rgba(255,255,255,0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== f) {
                  e.target.style.background = "rgba(255,255,255,0.1)";
                }
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div style={{ 
        padding: "32px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: 24,
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {filteredEntries.map((entry) => {
          const entryData = BULLET_POINTS[entry.title];
          
          return (
            <div
              key={entry.title}
              style={{
                background: "rgba(40, 40, 40, 0.8)",
                borderRadius: 12,
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                overflow: "hidden",
                height: "500px",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(80, 80, 80, 0.9)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(40, 40, 40, 0.8)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Cover Image & Title */}
              <div style={{ 
                position: "relative", 
                height: "200px",
                background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${entry.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "end",
                padding: 20
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: 22, 
                    fontWeight: 700, 
                    margin: "0 0 8px 0",
                    textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                    lineHeight: 1.2
                  }}>
                    {entry.title}
                  </h3>
                  <div style={{ 
                    color: "#b3b3b3", 
                    fontSize: 14,
                    textShadow: "0 1px 2px rgba(0,0,0,0.8)"
                  }}>
                    {entry.type} • {entry.year}
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div style={{ 
                flex: 1,
                padding: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{
                  flex: 1,
                  overflowY: "auto",
                  paddingRight: "8px",
                  marginBottom: "16px"
                }}>
                  <p style={{
                    color: "#e1e1e1",
                    fontSize: 16,
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {entryData?.description || "No description available."}
                  </p>
                </div>

                {/* Links Section */}
                {entryData?.links && (
                  <div style={{ 
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    paddingTop: "16px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8
                  }}>
                    {entryData.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "8px 16px",
                          background: "rgba(29, 185, 84, 0.1)",
                          border: "1px solid #1db954",
                          borderRadius: 20,
                          color: "#1db954",
                          textDecoration: "none",
                          fontSize: 12,
                          fontWeight: 600,
                          transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#1db954";
                          e.target.style.color = "#000";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "rgba(29, 185, 84, 0.1)";
                          e.target.style.color = "#1db954";
                        }}
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
      
      <style jsx>{`
        /* Custom scrollbar styling */
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  );
}

export default AllEntriesPage;