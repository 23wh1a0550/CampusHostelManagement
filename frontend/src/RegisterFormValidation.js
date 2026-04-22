import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterFormValidation() {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!user.fullName)
      newErrors.fullName = "Full Name is required";

    if (!user.email)
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Invalid email format";

    if (!user.password)
      newErrors.password = "Password is required";
    else if (user.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (user.password !== user.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!user.role)
      newErrors.role = "Role is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await axios.post("http://localhost:5000/register", {
          name: user.fullName,
          email: user.email,
          password: user.password,
          role: user.role
        });

        alert(res.data.message);

        if (res.data.message === "Registration successful") {
          localStorage.setItem("loggedUser", user.fullName);
          navigate("/home");
        }

      } catch (err) {
        console.log(err);
        alert("Server error");
      }
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>

        <input name="fullName" placeholder="Full Name"
          value={user.fullName} onChange={handleChange} style={styles.input} />
        {errors.fullName && <p style={styles.error}>{errors.fullName}</p>}

        <input name="email" placeholder="Email"
          value={user.email} onChange={handleChange} style={styles.input} />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        <input type="password" name="password" placeholder="Password"
          value={user.password} onChange={handleChange} style={styles.input} />
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        <input type="password" name="confirmPassword" placeholder="Confirm Password"
          value={user.confirmPassword} onChange={handleChange} style={styles.input} />
        {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}

        <input name="role" placeholder="Role (admin/student)"
          value={user.role} onChange={handleChange} style={styles.input} />
        {errors.role && <p style={styles.error}>{errors.role}</p>}

        <button type="submit" style={styles.button}>Register</button>

        <p style={{ textAlign: "center" }}>
  Already have account? <Link to="/login">Login</Link>
</p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #36d1dc, #5b86e5)"
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)"
  },
  title: { textAlign: "center" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  button: {
    padding: "10px",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px"
  },
  error: { color: "red", fontSize: "12px" }
};

export default RegisterFormValidation;