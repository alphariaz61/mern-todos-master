export default function Overlay ({text="Loading"}) {
    return (
        <div id="overlay">
            <p className="my-3 fs-3 fw-bolder">{text}</p>
            <div className="spinner-border text-success" role="status"/>
        </div>
    )
}