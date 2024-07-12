function Header() {
    return (
        <header className="header">
            <ul className="logo-items">
                <li><img src="/linkedin-logo.png" className="nav-logo" alt="LinkedIn Logo" /></li>
                <li><img src="/github-logo.png" className="nav-logo" alt="GitHub Logo" /></li>
            </ul>

            <nav className="nav"> 
                <ul className="nav-items">
                    <li>home</li>
                    <li>resume</li>
                    <li>projects</li>
                    <li>personal</li>
                </ul>
            </nav>
        </header>
    )
}

function MainContent() {
    return (
        <div>
            <h1>Shreya Nakum</h1>
        </div>
    )
}

function Page() {
    return (
        <div>
            <Header />
            <MainContent />
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById("root"))
