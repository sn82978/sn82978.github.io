function Header() {
    const currentPage = window.location.pathname;

    return (
        <header className="header">
            <h1>Shreya Nakum</h1>
            <nav className="nav"> 
                <ul className="nav-items">
                    <li><a href="/" className={currentPage === '/' ? 'active' : ''}>home</a></li>
                    <li><a href="resume.html" className={currentPage === '/resume.html' ? 'active' : ''}>resume</a></li>
                    <li><a href="projects.html" className={currentPage === '/projects.html' ? 'active' : ''}>projects</a></li>
                    <li><a href="personal.html" className={currentPage === '/personal.html' ? 'active' : ''}>personal</a></li>
                </ul>
            </nav>
        </header>
    )
}

function Footer() {
    return (
        <footer className="footer">
            <ul className="logo-items">
                <li><a href="https://www.linkedin.com/in/shreya-nakum-sn185/"><img src="/homepage/linkedin-logo.png" className="nav-logo" alt="LinkedIn Logo" /></a></li>
                <li><a href="https://github.com/sn82978"><img src="/homepage/github-logo.png" className="nav-logo" alt="GitHub Logo" /></a></li>
                <li><a href="mailto:snakum@uci.edu"><img src="/homepage/email-logo.png" className="nav-logo" alt="Email Logo" /></a></li>
            </ul>
        </footer>
    )
}

function Contact() {
    return (
        <div>
            <h2>
                Contact
                </h2>
                <p>
                    Email: shreyanakum2@gmail.com
                </p>
        </div>
    )
}

function Education() {
    return (
        <div>
            <h2>
                Education
            </h2>
            <h3>
                University of California Irvine, Honors - Computer Science
            </h3>
            <p>
                September 2023 - June 2026
                <ul>
                    <li>GPA: 3.90</li>
                    <li>Dean's List</li>
                    <li>Clubs: AI@UCI (Graphic Designer Co-Chair for AI@UCI), Astronomy@UCI</li>
                    <li>Relevant Coursework: Boolean Algebra, Python Programming, Discrete Math, Programming in C/C++</li>
                </ul>
            </p>
            <h3>
                Milpitas High School - High School Diploma
            </h3>
            <p>
                August 2019 - June 2023
                <ul>
                    <li>GPA: 4.64, top 9% of graduating class</li>
                    <li>Summa Cum Laude</li>
                    <li>Clubs: Milpitas High Science Olympiad (Captain, Public Relations Officer, Event Leader), Milpitas High Astronomy Club (Founder, President)</li>
                    <li>Relevant Coursework: AP Calculus AB/BC, Multivariable Calculus, AP Physics I, AP Computer Science A, AP Statistics, Advanced Python Programming</li>
                </ul>
            </p>
        </div>
    )
}

function Skills() {
    return (
        <div>
            <h2>Skills</h2>
            <p>
                <ul>
                    <li>Java</li>
                    <li>Python</li>
                    <li>SQL</li>
                    <li>C++</li>
                    <li>React.js</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>Typescript</li>
                    <li>Machine Learning</li>
                    <li>Tensorflow</li>
                    <li>Pytorch</li>
                    <li>NLP</li>
                </ul>
            </p>
        </div>
    )
}

function Experience() {
    return (
        <div>
            <h2>Experience</h2>
            <h3>Utiltyx, Milpitas, California - <i>Machine Learning Intern</i></h3>
            <p>
                July 2024 - present
                <ul>
                    <li>Trained an anomaly detection model from scratch to look for issues in internet traffic</li>
                </ul>
            </p>

            <h3>dabbl, Los Gatos, California - <i>Software Engineering Intern</i></h3>
            <p>
                June 2024 - present
                <ul>
                    <li>Worked on scraping data about colleges using College Scorecard and BeautifulSoup</li>
                    <li>Worked to develop a RAG framework</li>
                </ul>
            </p>

            <h3>Atoma Media, Irvine, California - <i>Large Language Model Specilist</i></h3>
            <p>
                November 2023 - present
                <ul>
                    <li>Developed a scraper to take comments from tweets about financial articles to gather sentiment and finetune the model</li>
                    <li>Developed a <a href="https://huggingface.co/snoneeightfive/final-luna-sentiment-analysis">deep learning sentiment analysis model</a> by fine tuning existing BERT model; Accuracy: 80%. </li>
                    <li>Worked on backend/frontend development for the site, using typescript and working with Huggingface API</li>
                </ul>
            </p>

            <h3>Cosmic-Ray Research, Pasadena, California - <i>Researcher/Second Author of Paper</i></h3>
            <p>
                November 2020 - March 2023
                <ul>
                    <li>Analyzed COS-Halos galaxy dataset to calculate the cosmic-ray diffusivity coefficient</li>
                    <li>Used Python and Jupyter Notebook to do calculations and generated plots with matplotlib</li>
                    <li>Collaborated with Dr. Iryna Butsky, a postdoctoral researcher & computational astrophysicist, on writing a <a href="https://academic.oup.com/mnras/article/521/2/2477/7070735">research paper</a> about constraining cosmic-ray transport with observations of the circumgalactic medium</li>
                    <li>Created a <a href="https://aas240-aas.ipostersessions.com/Default.aspx?s=39-11-68-61-92-B5-5B-4D-65-27-D7-9C-C2-2B-9E-B1#stay">research poster</a> and presented at the American Astronomical Society conference in June, 2022 </li>
                </ul>
            </p>

            <h3>Rapt.ai, Santa Clara, California - <i>Machine Learning Intern</i></h3>
            <p>
                May 2022 - September 2023
                <ul>
                    <li>Utilized Machine Learning models (BERT QA Model, nanoGPT)  and Transformers to improve the company’s existing program’s predictions</li>
                    <li>Created a question-answer model using Generative AI to aid engineers in getting values of GPU utilization based on given information (e.g. batch size, height, width) and plotted with the matplotlib module to picture them</li>
                </ul>
            </p>

            <h3>Sugar Mama Desserts, Milpitas, California - <i>Cashier/Closer</i></h3>
            <p>
                June 2022 - June 2023
                <ul>
                    <li>Sold ice cream, prepared ingredients to make ice cream, and cleaned and closed the shop</li>
                </ul>
            </p>
        </div>
    )
}

function Publications() {
    return (
        <div>
            <h2>Publications</h2>
            <h3>Constraining Cosmic-ray Transport with Observations of the Circumgalactic Medium</h3>
            <p>
            Butsky, I., Nakum, S., Ponnada, S., Hummels, C., Ji, S., & Hopkins, P., 2022, Constraining Cosmic-ray Transport with Observations of the Circumgalactic Medium, <a href="https://arxiv.org/abs/2210.14232">arxiv:2210.14232</a>, (submitted to MNRAS)
            </p>
            <p>
            Butsky, I., Nakum, S., Ponnada, S., Hummels, C., Ji, S., & Hopkins, P., 2022, Constraining Cosmic-ray Transport with Observations of the Circumgalactic Medium, Monthly Notices of the Royal Astronomical Society, Volume 521, Issue 2, May 2023, Pages 2477–2483, <a href="https://academic.oup.com/mnras/article/521/2/2477/7070735">https://doi.org/10.1093/mnras/stad671</a>
            </p>
        </div>
    )
}

function Page() {
    return (
        <div>
            <Header />
            <Contact />
            <Education />
            <Skills />
            <Experience />
            <Publications />
            <Footer />
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById("root"))