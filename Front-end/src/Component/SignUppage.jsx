import React  from "react";

const SignUppage = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const response = await fetch("http://localhost:3021/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: form.username,
                email: form.email,
                password: form.password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert("Signup successful");
    };

    return (
        <div className="signuppage-container">
            <img src={signupImg} alt="signup" className="signup-image" />

            <h2>Sign Up</h2>

            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                />

                <div className="password-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <div className="password-field">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        onChange={handleChange}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUppage;
