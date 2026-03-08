import './App.css';
import { useState } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [homeBackground, setHomeBackground] = useState('https://images.unsplash.com/photo-1551632786-de41ec16a41d?w=1500&h=1000&q=80');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('https://st4.depositphotos.com/1875497/22105/i/600/depositphotos_221053650-stock-photo-abstract-blur-defocused-restaurant-coffee.jpg');

  const VALID_EMAIL = 'instituto@idat.pe';
  const VALID_PASSWORD = '123456';

  const handleLoginChange = (e) => { 
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    if (loginData.email === VALID_EMAIL && loginData.password === VALID_PASSWORD) {
      setLoginSuccess(true);
      setError('');
      console.log('Login exitoso');
    } else {
      setError('Correo o contraseña incorrectos');
      setLoginSuccess(false);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    console.log('Registro:', registerData);
    alert('¡Cuenta creada exitosamente para: ' + registerData.email);
    setRegisterData({
      nombres: '',
      apellidos: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setIsLogin(true);
  };

  return (
    <div className="App">
      {loginSuccess ? (
        // SUCCESS SCREEN - HOME PAGE
        <div 
          className="auth-container home-container"
          style={{
            backgroundImage: homeBackground ? `url(${homeBackground})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="home-overlay"></div>
          
          {/* NAVBAR */}
          <nav className="home-navbar">
            <div className="navbar-menu">
              <button className="nav-btn">RESEÑA</button>
              <button className="nav-btn">RESERVAR CITA</button>
              <button className="nav-btn">CARTAS</button>
              <button className="nav-btn">REGISTRARSE</button>
            </div>
            
            <button
              type="button"
              className="btn-logout-navbar"
              onClick={() => {
                setLoginSuccess(false);
                setLoginData({ email: '', password: '' });
                setHomeBackground('https://images.unsplash.com/photo-1551632786-de41ec16a41d?w=1500&h=1000&q=80');
              }}
            >
              Iniciar sesión
            </button>
          </nav>

          {/* CONTENIDO PRINCIPAL */}
          <div className="home-content">
            <h1 className="home-title">404 HAMBRE NOT FOUND</h1>
            <p className="home-subtitle">
              Transformamos los errores en experiencia. Reserva tu mesa física,<br/>
              rápido y sin riñas. Porque el hambre no debería esperar
            </p>
          </div>
        </div>
      ) : isLogin ? (
        // LOGIN FORM
        <div className="auth-container">
          <div 
            className="diagonal-background"
            style={{
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setBackgroundImage(event.target.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="image-input"
              title="Haz clic para cambiar la imagen"
            />
          </div>
          <div className="form-card">
            <h1>404 Hambre Not Found</h1>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="ejemplo@gmail.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="btn-submit">INICIAR SESIÓN</button>
              <div className="social-login">
                <button type="button" className="btn-facebook">FACEBOOK</button>
                <button type="button" className="btn-google">GOOGLE</button>
              </div>
              <button
                type="button"
                className="btn-create"
                onClick={() => setIsLogin(false)}
              >
                CREAR CUENTA
              </button>
              <div className="info-box">
                <p><strong>Credenciales de prueba:</strong></p>
                <p>Email: instituto@idat.pe</p>
                <p>Código: 123456</p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // REGISTER FORM
        <div className="auth-container register">
          <div className="register-card">
            <div className="register-content">
              <div className="chef-logo">
                <h2>Uncle</h2>
                <h1>MASTER CHEF</h1>
                <p>Since 1990</p>
              </div>
              <div className="register-section">
                <h1 className="register-title">REGISTRA TUS DATOS</h1>
                <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label>Nombres</label>
                  <input
                    type="text"
                    name="nombres"
                    placeholder="Juan"
                    value={registerData.nombres}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Apellidos</label>
                  <input
                    type="text"
                    name="apellidos"
                    placeholder="Pérez García"
                    value={registerData.apellidos}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="ejemplo@gmail.com"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirmar Contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="btn-create-account">CREAR CUENTA</button>
                
                <button
                  type="button"
                  className="btn-back-login"
                  onClick={() => setIsLogin(true)}
                >
                  Volver al Login
                </button>
              </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
