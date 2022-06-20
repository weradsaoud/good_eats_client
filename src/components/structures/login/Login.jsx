import React, { useEffect, useState } from 'react';
import { firebase, auth } from '../../../globals/firebase';
import SigninToolbar from '../../views/signintoolbar/SigninToolbar';
import { Input, Button } from 'react-onsenui';
import './login.css';
import { Navigate, useLocation, useNavigate } from 'react-router';
import routes from '../../../globals/routes';
import ons from "onsenui";
import { LinearProgress } from '@mui/material';
import { connect } from "react-redux";
import * as actionsTypes from '../../../store/actions/actionsTypes';
import IModal from '../../views/modal/IModal';

const Login = (props) => {
	// Inputs
	const [mynumber, setnumber] = useState("");
	const [otp, setotp] = useState('');
	const [show, setshow] = useState(false);
	const [final, setfinal] = useState('');

	const [signningin, setSignningin] = useState(false);
	const [verifying, setVerifying] = useState(false);
	const [sendingOrder, setSendingOrder] = useState(false);

	useEffect(() => {
		return () => props.loginWillUnmount();
	}, []);

	let location = useLocation();
	let from = location.state;
	let navigate = useNavigate();


	const prepareOrder = (phoneNumber) => {
		let order = props.basket.map((basketItem, idx) => {
			let extras_ids = basketItem.extras.map((extra, idx) => {
				return extra.extraId;
			});
			return {
				phoneNumber: phoneNumber,
				store_id: basketItem.store.id,
				item_id: basketItem.item.item_id,
				variant_id: (basketItem.variantId == '') ? '' : basketItem.variantId,
				extras_ids: extras_ids,
				count: basketItem.count,
				orderItem_price: basketItem.basketItemPrice
			};
		});
		return order;
	};

	// Sent OTP
	const signin = () => {
		if (mynumber === "" || mynumber.length < 10) return;
		console.log('auth.currentUser: ', auth.currentUser);
		let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
		setSignningin(true);
		auth.signInWithPhoneNumber(mynumber, verify).then((result) => {
			setfinal(result);
			setshow(true);
			setSignningin(false);
		}).catch((err) => {
			setSignningin(false);
			console.log('err in signin: ', err);
			ons.notification.toast('Signin failed. Please, try again later.', { timeout: 2000, animation: 'fall', animationOptions: { duration: 0.2, delay: 0.4, timing: 'ease-in' } });
		});
	}

	// Validate OTP
	const ValidateOtp = () => {
		if (otp === null || final === null)
			return;
		setVerifying(true);
		final.confirm(otp).then((result) => {
			console.log('result: ', result);
			ons.notification.toast('You Signed in.', { timeout: 1000, animation: 'fall', animationOptions: { duration: 0.2, delay: 0.4, timing: 'ease-in' } });

			if (from == routes.basketPage) {
				setSendingOrder(true);
				let order = prepareOrder(result.user.auth.currentUser.phoneNumber);
				props.sendOrder(order);
			} else {
				setVerifying(false);
				navigate(from);
			}
		}).catch((err) => {
			ons.notification.toast('Signin failed. Please, try again later.', { timeout: 2000, animation: 'fall', animationOptions: { duration: 0.2, delay: 0.4, timing: 'ease-in' } });
			setVerifying(false);
		})
	}
	const modalFirstBtnOnClick = () => {
		navigate(routes.storesPageUrl);
	}

	return (
		<div className='login_container'>
			<SigninToolbar></SigninToolbar>
			<div className='login_content'>

				{!sendingOrder ? <div className='log_verify_div'>
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
							{!signningin ?
								<Button
									onClick={signin}
									style={{ 'textTransform': 'none', 'width': '100%', 'background': 'rgba(31, 173, 62, 0.8)' }}>
									Login
								</Button> :
								<LinearProgress color='success' />}
						</div>
					</div>
					<div className='verification_div' style={{ display: show ? "block" : "none" }}>
						<div className='verify_input_div'>
							<Input
								float
								onChange={(e) => { setotp(e.target.value) }}
								modifier='material'
								placeholder='Enter your OTP' />
						</div>
						<div className='verify_btns_div'>
							{!verifying ? <Button
								onClick={ValidateOtp}
								style={{ 'textTransform': 'none', 'width': '100%', 'background': 'rgba(31, 173, 62, 0.8)' }}>
								Verify
							</Button> :
								<LinearProgress color='success' />}
						</div>
					</div>
				</div> :
					<div className='sending_order'>
						{props.sendingOrder ? <div className='waiting_order_div'>
							<span className='sending_order_text'>Sending your order ... </span>
							<LinearProgress color='success' />
						</div> : null}

						{props.orderFailure ? <div className='order_failed_div'>
							<span className='sending_order_failed'>Order Failed, Please, try again later. </span>
						</div> : null}
						{props.orderSuccess ? <IModal
							isOpen={true}
							msg='Your order send successfully.'
							firstBtnContent='Ok'
							secondBtn={false}
							firstBtnOnClick={modalFirstBtnOnClick}
						/> : null}
					</div>}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		basket: state.stores.basket,
		sendingOrder: state.stores.sendingOrder,
		orderSuccess: state.stores.orderSuccess,
		orderFailure: state.stores.orderFailure,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		emptybasket: () => dispatch({ type: actionsTypes.EMPTYBASKET }),
		sendOrder: (order) => dispatch({ type: actionsTypes.SENDORDER, order: order }),
		loginWillUnmount: () => dispatch({ type: actionsTypes.LOGINWILLUNMOUNT })
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
