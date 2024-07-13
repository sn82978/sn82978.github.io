function Header() {
    return (
        <header className="header">
            <h1>Shreya Nakum</h1>
            <nav className="nav"> 
                <ul className="nav-items">
                    <li><a href = "/">home</a></li>
                    <li><a href = "resume.html">resume</a></li>
                    <li><a href = "projects.html">projects</a></li>
                    <li><a href = "personal.html">personal</a></li>
                </ul>
            </nav>
        </header>
    )
}

function MainContent() {
    return (
        <div>
            <div className="intro-wrapper">
                <img src="/homepage/shreya-head.JPG" className="shreya-pic" alt="Shreya" />
                <div className="about-section">
                        <h2>ABOUT</h2>
                        <p>
                            Hello! I am a Computer Science major with a minor in Math specializing in Artificial Intelligence and Machine Learning at UC Irvine. [Add research interests]
                        </p>
                        <p>
                            Throughout my academic journey, I have gained research experience and worked on various projects through internships and jobs that have honed my skills and deepened my understanding of ML algorithms and their applications. I am proficient in multiple programming languages, as well! From collaborating on research initiatives to developing applications, I am always excited to use my knowledge and skills to contribute to the tech world :)
                        </p>
                        <p>
                            <b>Email</b>: snakum@uci.edu
                        </p>
                </div>
            </div>
        </div>
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

function Page() {
    return (
        <div>
            <Header />
            <MainContent />
            <Footer />
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById("root"))