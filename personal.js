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

function MainContent() {
    return (
        <div>
            <h2 className="title">Personal</h2>
            <p className="p-personal">    I reside in Irvine most of the year. In the summer, I head back to Northern California to Milpitas! When I'm not coding away, I enjoy spending my time hiking, stargazing, listening to music, and swimming :)</p>
        </div>
    )
}

function ImageGallery() {
    return (
        <div>
            <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href="/personal/mt_san_jacinto.jpg">
                    <img src="/personal/eclipse.jpg" alt="Lunar Eclipse"></img>
                    </a>
                    <div class="desc">Viewing the May 2022 Lunar Eclipse, where I captured the total eclipse with my telescope and phone camera!</div>
                </div>
                </div>

                <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href="/personal/mt_san_jacinto.jpg">
                    <img src="/personal/mt_san_jacinto.jpg" alt="Mt. San Jacinto"></img>
                    </a>
                    <div class="desc">As a part of the UCI Astronomy Club, we went to Mt. San Jacinto State Park to camp, where we one day hike to explore the forest.</div>
                </div>
                </div>

                <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href="/personal/pismo_beach.jpeg">
                    <img src="/personal/pismo_beach.jpeg" alt="Pismo Beach"></img>
                    </a>
                    <div class="desc">I love boogie-boarding and swimming, especially in the ocean, here I am boogie-boarding at Pismo Beach!</div>
                </div>
                </div>

                <div class="responsive">
                <div class="gallery">
                    <a target="_blank" href="/personal/record_shop.jpeg">
                    <img src="/personal/record_shop.jpeg" alt="Record Shop"></img>
                    </a>
                    <div class="desc">I listen to all genres of music; my roommate and I visited a local record shop in the Bay Area to buy some of our favorite records.</div>
                </div>
                </div>

                <div class="clearfix"></div>
        </div>
    )
}

function Page() {
    return (
        <div>
            <Header />
            <MainContent />
            <ImageGallery />
            <Footer />
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById("root"))