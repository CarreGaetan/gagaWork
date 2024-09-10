import './Dashboard.scss'
import background from "../../../public/backgroundImg.jpg"

function Dashboard() {
    return (
        <div className="InfosContainer">
            <img src={background} alt="" />
            <p>21:43</p>
        </div>
    )
}

export default Dashboard