import React from "react";
import { Button, Modal } from "react-onsenui";
import './modal.css'

function IModal(props) {

    return (
        <Modal isOpen={props.isOpen}>
            <div className="modal_container">
                <div className="modal_wrapper">
                    <div className="modal_msg">
                        {props.msg}
                    </div>
                    <div className="modal_btns">
                        <div className="first_btn_div">
                            <Button className="first_btn" onClick={props.firstBtnOnClick}>{props.firstBtnContent}</Button>
                        </div>

                        <div className="second_btn_div">
                            <Button className="second_btn" onClick={props.secondBtnOnClick}>{props.secondBtnContent}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default IModal;