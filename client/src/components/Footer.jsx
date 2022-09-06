import LogoutButton from "./LogoutButton";

export default function Footer () {
    return (
        <footer id="footer" className="d-flex justify-content-between align-items-center px-5 py-3 ">
            <span className="text-muted">© 2022 Alpha Javascript Inc</span>
            <LogoutButton/>
        </footer>
    )
}