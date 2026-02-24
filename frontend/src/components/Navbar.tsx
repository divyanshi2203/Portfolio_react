import "./Navbar.css";

type NavbarProps = {
  name: string;
};

export default function Navbar({ name }: NavbarProps) {
  return (
    <div className="navRoot">
      <div className="navInner">
        <a className="brand" href="#top" aria-label="Go to top">
          <span className="brandDot" />
          <span className="brandText">{name}</span>
        </a>

        <nav className="navLinks">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="cta" href="#contact">
          Hire / Connect
        </a>
      </div>
    </div>
  );
}