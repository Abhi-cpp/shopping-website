import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { API_CLIENT } from '../shared/services/api-client'



function Signin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [load, setLoad] = useState(false);

    useEffect(() => {

        async function checkUser() {
            const token = localStorage.getItem('TOKEN');
            if (token) {
                const response = await API_CLIENT.get(process.env.REACT_APP_AUTHENTICATE_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    console.log("token wala call", response.data.decoded);
                    if (response.data.decoded.isseller === true)
                        navigate('/admin')
                    else
                        navigate('/home')
                }

            }
            }
        
        checkUser();
    },)


    const handleSubmit = () => {
        // console.log(email, password)
        setLoad(true);

        API_CLIENT.post(process.env.REACT_APP_LOGIN_URL,
            {
                email,
                password
            })
            .then(res => {
                console.log(res.data)

                if (res.status === 400) {

                    alert('User Not Found')
                }

                else if (res.status === 200) {

                    // move to home
                    localStorage.setItem('TOKEN', res.data.token)
                    localStorage.setItem('EMAIL', res.data.email)
                    localStorage.setItem('NAME', res.data.name)
                    if (res.data.seller === true)
                        navigate('/admin')
                    else
                        navigate('/home')
                }
            }).catch(err => {
                alert("User not found")
                setLoad(false);
                // navigate('/')
                // console.log(err)
            })
    }

    return (<>
        <div className="signin">
        <h1 className="center sign"> SIGNIN </h1>

        
        <div className="outcard">
            Email :
            <input
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                placeholder = "Enter registered Email"
                value={email}
                className="inputs"
                type="email" /> <br /> <br />
            Password :
            <input
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                placeholder = "Enter password"
                value={password}
                className="inputs" type="password" /> <br /> <br />

            {load  ? <CircularProgress className="redirecting"/> : <div>

            <button
                onClick={() => {if(email === '' || password === '')
                {
                    alert("Please don't leave any field empty!!");
                    console.log("************((((((())))))))))))))))))")
                }
                else (handleSubmit())}}
                className="btns"> SUBMIT </button>
            <Link className="link-bt" style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                to={'/signup'}> SIGN UP </Link>
            </div>}
            {/* <div>

            <button`
                onClick={handleSubmit}
                className="btns"> SUBMIT </button>
            <Link className="link-bt" style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                to={'/signup'}> SIGN UP </Link>
            </div> */}

        </div>
                

        
        </div>
    </>
    )
}


export default Signin
