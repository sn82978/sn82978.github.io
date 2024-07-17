export default function Header() {
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

