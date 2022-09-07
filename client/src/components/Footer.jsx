import LogoutButton from "./LogoutButton";

export default function Footer () {
    const year = (new Date()).getFullYear()
    return (
        <footer id="footer" className="d-flex justify-content-between align-items-center px-5 py-3 ">
            <span className="text-muted">© {year} Alpha Javascript Inc</span>
            <LogoutButton/>
        </footer>
    )
}