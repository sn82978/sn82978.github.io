import React, { useState } from "react";

const FILTERS = ["Research", "Projects"];

const BULLET_POINTS = {
  "Constraining Cosmic-Ray Transport with Observational Data": [
    "This project was my introduction to the world of research, and, as you may have noticed, focused in on computational astrophysics. In this project, I learned how to use libraries like pandas and numpy to do data analysis on large datasets. In the project, my role focused on on creating a plot using a variety of astronomy and data science libraries showing the effective diffusicity coefficient for all galaxies in the Hubble COS-Halos dataset. Checkout the published paper, poster, and Github containing my work.",
    <>
      <a
        href="https://aas240-aas.ipostersessions.com/Default.aspx?s=39-11-68-61-92-B5-5B-4D-65-27-D7-9C-C2-2B-9E-B1#stay"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Poster at AAS
      </a>{" "}
    </>,
    <>
      <a
        href="https://academic.oup.com/mnras/article/521/2/2477/7070735"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Published Paper
      </a>{" "}
    </>,
    <>
      <a
        href="https://github.com/sn82978/Cosmic-Ray-Transport-Plots"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Github Repository
      </a>{" "}
    </>
  ],
  "Statistical Analaysis and Machine Learning to Detect Drift v. Anti-Drift": [
    "At the Rose lab, this project was meant to look at which aspect of evolution is more important: Drift (random changes in the genome) or selection (specific changes in the genome to make one part dominant). We do this by studying SNPs, a genomic variant at a single base position in the DNA. However, to truly do this research, we need to identify which SNPs are evolving and which ones are not. We do this by looking at the SNP's change over time (generations of flies), and then we have to decide if that change is significant of evolution or not, which we need p-value of. To find the best p-value, I trained 220 Random Forest ML models based on selection and population, finding that a p-value of 0.000218 is better. Additionally, I created an unsupervised model with UMAP dimension reduction to see if there is a relationship between frequency changes and trajectory. The project was funded by Calit2.",
    <>
      <a
        href="https://docs.google.com/presentation/d/1aWlFPqgMO3BhaZnXAVgsTnJD6uUTx6W7gs6-XFdm-R8/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Slides from Oral Presentation at Calit2 2025
      </a>{""}
    </>,
    <>
      <a
        href="https://drive.google.com/file/d/1jpDVq2Ie3iVeWhEsMzWQTm08o821e0iy/view?usp=drive_link"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Poster at UROP 2025
      </a>{" "}
    </>,
    <>
      <a
        href="https://github.com/rose-mueller-labs/snp-data"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Github Repository
      </a>{" "}
    </>,
  ],
  "Tiling: Computer Vision to Detect Fruit Fly Eggs": [
    "This project-ongoing-looks to utilizing machine learning tools to find the number of fruit fly eggs in a grid-like image of caps. Each grid-like image countains ~16 caps that each contain even smaller fruit fly eggs. As can be seen, these are extremely small objects, and, modern computer vision techniques do not perform well at small object detection. Therefore, we created a recursive data preparation technique called Tiling where the training dataset instead consists of the original image split into smaller tiles of size 75x75 pixels. These images are then labeled, in our case, with the number of eggs on them. For inference, the model is fed an entire grid-image, which is split into caps, which is then split into tiles. It predicts based on tiles, and then reconstructs and sums up the counts to get the total predicted cap count, and then sums up the counts for the entire grid-like image. This project won #1 at the UROP 2025 Group Oral Speech Competition and was funded by UCI UROP.",
    <>
      <a
        href="https://drive.google.com/file/d/1tDlDDwiDEWAMkyRW2rBC2F8td4dDidTX/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Slides from Oral Presentation (Won) at UROP 2025
      </a>{""}
    </>,
    <>
      <a
        href="https://github.com/sn82978/CNN-Classifier"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Github Repository
      </a>{" "}
    </>,
  ],
  "UI for Tiling": [
    "This was the counterpart to the Tiling project, a UI created to help easily create a training dataset for machine learning models using the Tiling technique. You simply follow the instruction on the README.md and upload your images directory and start labelling. The idea is that to label each square, the name of the file is modified, and then to train, the dataset is set up such that the class is extracted directly from the file's name.",
    <>
      <a
        href="https://github.com/sn82978/Classifier-Site"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Github Repository
      </a>{" "}
    </>,
  ],
  "Sentiment Analysis for Financial News": [
    "Using a dataset of Twitter financial headlines and comments, I decide whether or not a Twitter headline is of positive, negative, or neutral sentiment based on the overall sentiment of the comments, pruning comments that are by bots or irrelevant. I fine-tuned a BERT model to do this using Hugging Face's Transformers. The Twitter database was saved to a database on pgadmin, so I had to use SQL to query it and get the information I wanted regarding article titles (the headlines) and the comments. Overall, the model is deployed on Hugging Face and has over 6k downloads.",
    <>
      <a
        href="https://huggingface.co/snoneeightfive/financial-news-headers-sentiment-analysis"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Hugging Face Model Card
      </a>{" "}
    </>,
  ],
  "HackMIT: ActsAI": [
    "This was my project at HackMIT 2024, where my team and I created a website that matches you to a therapist using a chatbot. The site unfortunately did not deploy properly but when working on the project, I worked on scraping the internet for therapists, creating a service that automatically detects dangerous self-harming behaviors in the chat and alerts emergency services of it, fine-tuning the LLM, and deploying it LLM using Modal.",
    <>
      <a
        href="https://github.com/PatelPurav05/ActsAI"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Github Repository
      </a>{" "}
    </>,
  ],
  "Boiling Bad": [
    "Boiling Bad-and Bottom Bun-is my roomate and I's little side-project. The website showcases our concoctions and potions with a seamless UI. The site displays a limited navbar, showing tiles to allow you to navigate to see our recipes and videos. It is minamalistic but also gives hints of a 2000s UI. In making this website, routing and embeddings the videos were the biggest challenges. I had to make sure that every page could be accessed in some way and that the videos showed up properly.",
    <>
      <a
        href="https://sn82978.github.io/BOILING-BAD/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Deployed Site
      </a>{" "}
    </>,
    <>
      <a
        href="https://github.com/sn82978/BOILING-BAD"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1db954" }}
      >
        Github Repository
      </a>{" "}
    </>,
  ],
};


function AllEntriesPage({ entries }) {
  const [filter, setFilter] = useState(FILTERS[0]);
  const filteredEntries = entries.filter(e => e.category === filter);

  return (
    <div style={{ padding: "32px", background: "#181818", minHeight: "100vh" }}>
      <h2 style={{ color: "#fff", fontSize: 28, marginBottom: 16 }}>Shreya Nakum</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              border: "none",
              background: filter === f ? "#fff" : "#222",
              color: filter === f ? "#000" : "#fff",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer"
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div>
        {filteredEntries.map((entry) => (
          <div
            key={entry.title}
            style={{
              width: "100%",
              background: "#222",
              borderRadius: 16,
              padding: 24,
              marginBottom: 32,
              boxSizing: "border-box"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
              <img
                src={entry.cover}
                alt={entry.title}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 12,
                  objectFit: "cover",
                  marginRight: 24,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)"
                }}
              />
              <div>
                <div style={{ color: "#fff", fontSize: 32, fontWeight: 700 }}>{entry.title}</div>
                <div style={{ color: "#b3b3b3", fontSize: 18, marginTop: 8 }}>
                  {entry.type} &middot; {entry.year}
                </div>
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, marginLeft: 12 }}>
            {(BULLET_POINTS[entry.title] || []).map((point, idx) => (
              <li
                key={idx}
                style={{
                  color: "#fff",
                  fontSize: 16,
                  marginBottom: 20, // Increased from 10 to 20 for more space
                  display: "flex",
                  alignItems: "center",
                  lineHeight: 1.7 // Increases vertical space within each bullet
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    color: "#1db954",
                    fontSize: 18,
                    marginRight: 10
                  }}
                >
                  &#9654;
                </span>
                {point}
              </li>
            ))}
          </ul>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AllEntriesPage;
