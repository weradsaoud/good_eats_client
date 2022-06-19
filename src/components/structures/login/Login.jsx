import React, { useState } from 'react';
import { firebase, auth } from '../../../globals/firebase';
import SigninToolbar from '../../views/signintoolbar/SigninToolbar';
import { Input, Button } from 'react-onsenui';
import './login.css';
import { useLocation, useNavigate } from 'react-router';
import routes from '../../../globals/routes';

const Login = () => {
	// Inputs
	const [mynumber, setnumber] = useState("");
	const [otp, setotp] = useState('');
	const [show, setshow] = useState(false);
	const [final, setfinal] = useState('');


	let location = useLocation();
	let from = location.state;
	let navigate = useNavigate();

	// Sent OTP
	const signin = () => {

		if (mynumber === "" || mynumber.length < 10) return;
		console.log('auth.currentUser: ', auth.currentUser);
		let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
		auth.signInWithPhoneNumber(mynumber, verify).then((result) => {
			setfinal(result);
			alert("code sent")
			setshow(true);
		})
			.catch((err) => {
				alert(err);
				window.location.reload()
			});
	}

	// Validate OTP
	const ValidateOtp = () => {
		if (otp === null || final === null)
			return;
		final.confirm(otp).then((result) => {
			navigate(routes.storesPageUrl);
			alert('success');
			console.log('result: ', result);
			console.log('auth.currentUser: ', auth.currentUser);
		}).catch((err) => {
			alert("Wrong code");
		})
	}

	return (
		<div className='login_container'>
			<SigninToolbar></SigninToolbar>
			<div className='login_content'>
				<div className='phone_div' style={{ display: !show ? "block" : "none" }}>
					<div className='phone_input_div'>
						<Input
							value={mynumber} float
							onChange={(e) => {
								setnumber(e.target.value)
							}}
							modifier='material'
							placeholder='phone number' />
					</div>
					<div id="recaptcha-container" className='recaptcha_div'></div>
					<div className='signin_btns_div'>
						<Button onClick={signin} style={{'textTransform': 'none', 'width':'100%', 'background': 'rgba(31, 173, 62, 0.8)'}}>Login</Button>
					</div>
				</div>
				<div className='verification_div' style={{ display: show ? "block" : "none" }}>
					<div className='verify_input_div'>
						<Input
							value={mynumber} float
							onChange={(e) => { setotp(e.target.value) }}
							modifier='material'
							placeholder='Enter your OTP' />
					</div>
					<div className='verify_btns_div'>
						<Button onClick={ValidateOtp} style={{'textTransform': 'none', 'width':'100%', 'background': 'rgba(31, 173, 62, 0.8)'}}>Verify</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
