// import {Link} from "react-router-dom";
// import {useEffect, useState} from "react";
//
// export default function Register({onRegister}) {
//     const intialValues = {username:"", email: "", password:""};
//     const [formValues, setFormValues] = useState(intialValues);
//     const [formErrors, setFormErrors] = useState({});
//     const [isSubmit, setIsSubmit] = useState(false)
//
//     const handleChange = (e) =>{
//         const{name , value, validationMessage} = e.target;
//         setFormValues({...formValues, [name]: value});
//         setFormErrors({...formErrors, [name]: validationMessage});
//     }
//     const validate =(values)=>{
//         const errors = {};
//         const regex = /^[^\\$@]+@[^\\$@]+\\.[^\\$@]{2,}$/i;
//
//         if (!values.username){
//             errors.username = "Username is required!";
//         }
//
//         if(!values.email){
//             errors.email= "Email is required!";
//         }else if(!regex.test(values.email)){
//             errors.email = "This is not a valid email format!";
//         }
//
//         if(!values.password){
//             errors.password= "Password is required!";
//         } else if(values.password <4){
//             errors.password = "Password must be more than 4 characters";
//         } else if(values.password>16){
//             errors.password = "Password cannot be more than 16 characters";
//         }
//         return errors;
//     }
//     const handleSubmit =(e) =>{
//         e.preventDefault();
//         setIsSubmit(true);
//     }
//
//     return (
//         <section className='register'>
//             <div className="auth">
//                 <Link className="header__link-logo link" to="/"></Link>
//                 <h1 className="auth__title">Добро пожаловать!</h1>
//             </div>
//             <form className='auth__form'
//                   onSubmit={handleSubmit}
//             noValidate>
//                 <label className="auth__label">Имя</label>
//                     <input
//                         type="text"
//                         className='auth__input'
//                         name="username"
//                         placeholder="Введите имя"
//                         required
//                         onChange={handleChange}
//                         value={formValues.username}
//                     />
//                     <p className="auth__span-error">{ formErrors.username}</p>
//                 <label className="auth__label">E-mail
//                     <input
//                         required="Please Enter Your Email!"
//                         className='auth__input'
//                         type="email"
//                         name="email"
//                         placeholder="Введите E-mail"
//                         onChange={handleChange}
//                         value={formValues.email}
//                     />
//                     <p
//                             className="auth__span-error">{ formErrors.email}</p>
//                 </label>
//                 <label className="auth__label">Пароль
//                     <input
//                         className='auth__input'
//                         required="Please Enter Your Password"
//                         type="password"
//                         name="password"
//                         placeholder="Придумайте пароль"
//                         minLength={4}
//                         maxLength={16}
//                         onChange={handleChange}
//                         value={formValues.password}
//                     />
//                     <p
//                         className="auth__span-error">{ formErrors.password}</p>
//                 </label>
//                 <button className='auth__button'>Зарегистрироваться</button>
//             </form>
//             <p className='auth__subtitle'>Уже зарегистрированы?&ensp;
//                 <Link to='/sign-in' className='link__nav text__link'>Войти</Link></p>
//         </section>
//     )
// }
