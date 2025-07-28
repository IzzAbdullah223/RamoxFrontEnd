import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import icon from './Icon.jpg';  

function Login() {
  const [isArabic, setIsArabic] = useState(false);
  const navigate = useNavigate();
  
  const toggleLanguage = () => setIsArabic(!isArabic);

  const handleLogin = () => {
    navigate('/markets');
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${isArabic ? styles.rtl : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={styles.logoContainer}>
          <img src={icon} alt="Logo" className={styles.logoIcon} />
          <div className={styles.logo}>RAmox</div>
        </div>
        
        <div className={styles.languageToggle} onClick={toggleLanguage}>
          {isArabic ? 'English' : 'العربية'}
        </div>
        
        <h1 className={styles.title}>{isArabic ? 'تسجيل الدخول' : 'Login'}</h1>
        
        <div className={styles.inputGroup}>
          <label>{isArabic ? 'البريد الإلكتروني' : 'Email'}</label>
          <input type="email" placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'} />
        </div>
        
        <div className={styles.inputGroup}>
          <label>{isArabic ? 'كلمة المرور' : 'Password'}</label>
          <input type="password" placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter your password'} />
        </div>
        
        <button className={styles.button} onClick={handleLogin}>
          {isArabic ? 'تسجيل الدخول' : 'Login'}
        </button>
        
        <p className={styles.signupText}>
          {isArabic ? 'ليس لديك حساب؟' : 'Don\'t have an account?'} 
          <a href="#">{isArabic ? 'اشترك الآن' : 'Sign up'}</a>
        </p>
      </div>
    </div>
  );
}

export default Login;