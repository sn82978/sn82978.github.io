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

function Title() {
    return (
        <h2 className="title">Projects</h2>
    )
}

const { useState } = React;

function MainContent() {
  return (
    <div className="projects-container">
      <div className="projects-text">
      {/* <a href="iryna-research.html"><img src="/poster-presenting.jpg" className="project-pic" alt="Presenting Poster" /></a> */}
        <h3>Constraining cosmic ray transport with observations of the circumgalactic medium</h3>
          <p>On the project, I wrote programs to create and analyze trends in plots and presenting the research. Initially, I wrote scripts in python using modules like numpy and pandas to do calculations with galaxy datasets. The dataset provided me with the galaxy’s stellar mass, virial radius, instantaneous star formation rate, and hydrogen column density. However, the model to calculate the effective cosmic ray transport rate used the variables of halo mass, circular velocity, and specific star formation rate. Thus, I converted the data into the variables I needed. The plots I created displayed the lower limits of the effective transport rate for each galaxy in the dataset as well as the errors present.</p>
          <p>Next, I created a poster about the research and presented it at the AAS 240 conference. After the presentation, I began to work on the research paper. I helped write the methods section of the paper, describing the plot that displays the final transport rate values for each galaxy in the dataset.</p>
      </div>
      <div className="projects-text">
        <h3>Cipherbot: A Discord bot for the Science Olympiad Codebusters Event</h3>
        <p>In this project, I created a Discord bot using the discord.py module that encodes plaintext from random Wikipedia articles and the quotes channels of Discord servers to create ciphers. You can add the bot to your own server by clicking here. The bot provides the cipher for you to solve with "aristocrat" slash command (/aristocrat) and /answer will give you the answer to the cipher! It was a fun project to work on as I love the Science Olympiad Codebusters event. </p>
        <p><a href="https://github.com/sn82978/Cipherbot">Cipherbot repository</a></p>
      </div>
    </div>
  );
}

function MainContent_Two() {
    return (
      <div className="projects-container">
        <div className="projects-text">
          <h3>VenusHacks 2024: ZotBright</h3>
          <p>From having to navigate campus in the dark, returning from 8:00 PM computer science classes, campus can seem scary. These struggles of having to find restrooms on campus with period products, traversing campus safely at night, and even finding inclusive spaces are experiences our team has been through on multiple occasions.</p>
          <p>With ZotBright, we wanted to solve these issues with a multi-faceted website that allows you to open a map of our campus and see which restrooms have period products and which pathways are best lit/are dark. With features such as the sunset time, as well, users can plan their routes accordingly and stay safe. In the case that of immediate danger, we provided an SOS page where users can immediately call the UCI Police for help, alongside other health/safety resource numbers. With our period products feature, users can update whether or not restrooms they visit are stocked, using the Updates page.</p>
          <p>Check out our devpost <a href="https://devpost.com/software/zotbright?ref_content=user-portfolio&ref_feature=in_progress">here</a></p>
        </div>
        <div className="projects-text">
          <h3>AI Project 1: Coming Soon!</h3>
          <p> </p>
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
            <MainContent_Two />
            <Footer />
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById("root"))