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

function Title() {
    return (
        <h1>Projects</h1>
    )
}

const { useState } = React;

function MainContent() {
  return (
    <div className="projects-container">
      <div className="projects-text">
        <h2>Constraining cosmic ray transport with observations of the circumgalactic medium</h2>
        <p>On the project, I wrote programs to create and analyze trends in plots and presenting the research. Initially, I wrote scripts in python using modules like numpy and pandas to do calculations with galaxy datasets. The dataset provided me with the galaxy’s stellar mass, virial radius, instantaneous star formation rate, and hydrogen column density. However, the model to calculate the effective cosmic ray transport rate used the variables of halo mass, circular velocity, and specific star formation rate. Thus, I converted the data into the variables I needed. The plots I created displayed the lower limits of the effective transport rate for each galaxy in the dataset as well as the errors present.</p>
        <p>Next, I created a poster about the research and presented it at the AAS 240 conference. After the presentation, I began to work on the research paper. I helped write the methods section of the paper, describing the plot that displays the final transport rate values for each galaxy in the dataset.</p>
      </div>
      <div className="projects-text">
        <h2>Cipherbot: A Discord bot for the Science Olympiad Codebusters Event</h2>
        <p>In this project, I created a Discord bot using the discord.py module that encodes plaintext from random Wikipedia articles and the quotes channels of Discord servers to create ciphers. You can add the bot to your own server by clicking here. The bot provides the cipher for you to solve with "aristocrat" slash command (/aristocrat) and /answer will give you the answer to the cipher! It was a fun project to work on as I love the Science Olympiad Codebusters event. </p>
        <p><a href="https://github.com/sn82978/Cipherbot">Cipherbot repository</a></p>
      </div>
    </div>
  );
}


function Page() {
    return (
        <div>
            <Header />
            <Title />
            <MainContent />
            <Footer />
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById("root"))