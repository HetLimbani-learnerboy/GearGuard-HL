import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ title }) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <h2>{title}</h2>

      <div className="navbar-right">
        <input className="search-input" placeholder="Search..." />

        <FiUser
          className="nav-icon"
          size={22}
          onClick={() => navigate("/profile")}
        />

         <div className="avatar">AN</div>
       </div>
    </header>
  );
}
