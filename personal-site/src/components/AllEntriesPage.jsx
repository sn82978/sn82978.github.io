import React, { useState } from "react";

const FILTERS = ["Research", "Projects"];

const BULLET_POINTS = {
  "Constraining Cosmic-Ray Transport with Observational Data": {
    description: "This project was my introduction to the world of research, and, as you may have noticed, focused in on computational astrophysics. In this project, I learned how to use libraries like pandas and numpy to do data analysis on large datasets. In the project, my role focused on creating a plot using a variety of astronomy and data science libraries showing the effective diffusivity coefficient for all galaxies in the Hubble COS-Halos dataset.",
    links: [
      { title: "Poster at AAS", url: "https://aas240-aas.ipostersessions.com/Default.aspx?s=39-11-68-61-92-B5-5B-4D-65-27-D7-9C-C2-2B-9E-B1#stay" },
      { title: "Published Paper", url: "https://academic.oup.com/mnras/article/521/2/2477/7070735" },
      { title: "Github Repository", url: "https://github.com/sn82978/Cosmic-Ray-Transport-Plots" }
    ]
  },
  "Statistical Analysis and Machine Learning to Detect Drift v. Anti-Drift": {
    description: "At the Rose lab, this project was meant to look at which aspect of evolution is more important: Drift (random changes in the genome) or selection (specific changes in the genome to make one part dominant). We do this by studying SNPs, a genomic variant at a single base position in the DNA. However, to truly do this research, we need to identify which SNPs are evolving and which ones are not. We do this by looking at the SNP's change over time (generations of flies), and then we have to decide if that change is significant of evolution or not, which we need p-value of. To find the best p-value, I trained 220 Random Forest ML models based on selection and population, finding that a p-value of 0.000218 is better. Additionally, I created an unsupervised model with UMAP dimension reduction to see if there is a relationship between frequency changes and trajectory. The project was funded by Calit2.",
    links: [
      { title: "Slides from Oral Presentation at Calit2 2025", url: "https://docs.google.com/presentation/d/1aWlFPqgMO3BhaZnXAVgsTnJD6uUTx6W7gs6-XFdm-R8/edit?usp=sharing" },
      { title: "Poster at UROP 2025", url: "https://drive.google.com/file/d/1jpDVq2Ie3iVeWhEsMzWQTm08o821e0iy/view?usp=drive_link" },
      { title: "Github Repository", url: "https://github.com/rose-mueller-labs/snp-data" }
    ]
  },
  "Tiling: Computer Vision to Detect Fruit Fly Eggs": {
    description: "This project-ongoing-looks to utilizing machine learning tools to find the number of fruit fly eggs in a grid-like image of caps. Each grid-like image contains ~16 caps that each contain even smaller fruit fly eggs. As can be seen, these are extremely small objects, and, modern computer vision techniques do not perform well at small object detection. Therefore, we created a recursive data preparation technique called Tiling where the training dataset instead consists of the original image split into smaller tiles of size 75x75 pixels. These images are then labeled, in our case, with the number of eggs on them. For inference, the model is fed an entire grid-image, which is split into caps, which is then split into tiles. It predicts based on tiles, and then reconstructs and sums up the counts to get the total predicted cap count, and then sums up the counts for the entire grid-like image. This project won #1 at the UROP 2025 Group Oral Speech Competition and was funded by UCI UROP.",
    links: [
      { title: "Slides from Oral Presentation (Won) at UROP 2025", url: "https://drive.google.com/file/d/1tDlDDwiDEWAMkyRW2rBC2F8td4dDidTX/view?usp=sharing" },
      { title: "Github Repository", url: "https://github.com/sn82978/CNN-Classifier" }
    ]
  },
  "Uncovering the Typing and Distribution of Code Clones Across Forks of Open Source Microservice Repositories": {
    description: "Code reuse is a widespread efficiency practice in software development, especially in the emerging realm of microservice development. Microservices are small-scale, single-task or single-service software components which are coupled to other microservices to form robust large software systems via common communication protocols. There is a proliferation of microservice projects available with open source licenses through Github. This allows developers to quickly copy and adapt existing architecture to any given use case, but it also results in a proliferation of reused code in various states of change from the original source. Use of cloned code, though efficient, can carry intensive maintenance costs if changes are required across the entire population of a given clone. Identifying the presence and distribution of code clones within a software project is therefore of interest to developers, but manual identification of cloned code segments is tedious and time-consuming as code clones may exist as any of several subtypes. Furthermore, existing analysis tools are often limited in scope and available only for select programming languages. In response to the need for rapid and multilingual analysis for the full spectrum of code clone types, large language models (LLMs) emerge as a prime contender. In order to evaluate the potential of LLMs for this purpose, we compiled a dataset of 26 open source microservice repositories and 26 forks in various states of change and compared the performance of one general purpose and two code-specific LLMs. We found that the sampled LLMs performed close to the overall accuracy of human evaluators in identifying overall distribution of clones on a subset of the data, albeit with false negative results. We also found LLMs to be perform well at differentiating between clone subtypes when compared to an approach using non-generative machine learning techniques.",
    links: [
      { title: "Github Repository", url: "https://github.com/Camithilwen/Code-Cloning-Analysis" }
    ]
  },
  "UI for Tiling": {
    description: "This was the counterpart to the Tiling project, a UI created to help easily create a training dataset for machine learning models using the Tiling technique. You simply follow the instruction on the README.md and upload your images directory and start labelling. The idea is that to label each square, the name of the file is modified, and then to train, the dataset is set up such that the class is extracted directly from the file's name.",
    links: [
      { title: "Github Repository", url: "https://github.com/sn82978/Classifier-Site" }
    ]
  },
  "AI@UCI: Workshops": {
    description: "As a member of the AI@UCI executive board, I have been presenting and giving talks about different machine learning topics for around a year! My workshops have taught undergraduate and graduate students part of AI@UCI as well as local high schoolers. I have taught about vision transformers, my own research at Rose Labs, and how to use PyTorch by making a simple PyTorch classifier.",
    links: [
      { title: "Github Repository", url: "https://github.com/Artificial-Intelligence-UC-Irvine/2024-Workshops" }
    ]
  },
  "Sentiment Analysis for Financial News": {
    description: "Using a dataset of Twitter financial headlines and comments, I decide whether or not a Twitter headline is of positive, negative, or neutral sentiment based on the overall sentiment of the comments, pruning comments that are by bots or irrelevant. I fine-tuned a BERT model to do this using Hugging Face's Transformers. The Twitter database was saved to a database on pgadmin, so I had to use SQL to query it and get the information I wanted regarding article titles (the headlines) and the comments. Overall, the model is deployed on Hugging Face and has over 6k downloads.",
    links: [
      { title: "Hugging Face Model Card", url: "https://huggingface.co/snoneeightfive/financial-news-headers-sentiment-analysis" }
    ]
  },
  "HackMIT: ActsAI": {
    description: "This was my project at HackMIT 2024, where my team and I created a website that matches you to a therapist using a chatbot. The site unfortunately did not deploy properly but when working on the project, I worked on scraping the internet for therapists, creating a service that automatically detects dangerous self-harming behaviors in the chat and alerts emergency services of it, fine-tuning the LLM, and deploying it LLM using Modal.",
    links: [
      { title: "Github Repository", url: "https://github.com/PatelPurav05/ActsAI" }
    ]
  },
  "Boiling Bad": {
    description: "Boiling Bad-and Bottom Bun-is my roommate and I's little side-project. The website showcases our concoctions and potions with a seamless UI. The site displays a limited navbar, showing tiles to allow you to navigate to see our recipes and videos. It is minimalistic but also gives hints of a 2000s UI. In making this website, routing and embedding the videos were the biggest challenges. I had to make sure that every page could be accessed in some way and that the videos showed up properly.",
    links: [
      { title: "Deployed Site", url: "https://sn82978.github.io/BOILING-BAD/" },
      { title: "Github Repository", url: "https://github.com/sn82978/BOILING-BAD" }
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
                    fontSize: 14,
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