// --- Core ---
import React from "react";
import stylesbtn from '../../styles/SetStatusbtn.module.css';

type btnSetStatusProps = {
    completed: boolean,
}


const SetStatusbtn = function ({ completed }: btnSetStatusProps) {

    if (completed) {
        return (
            <AnimationTicked />
        )
    }
    return (
        <AnimationUnTicked />
    )
}

const AnimationTicked = () => {
    return (
        <div 
        className={`${stylesbtn['animation-ctn']} w-10 h-10 p-1 rounded-full hover:bg-gray-200`} 
        title={`This task is completed.`}
        >
            {/* Credit for wallace.ho | https://codepen.io/wallaceho/pen/vxLbRO */}
            <div className={`${stylesbtn.svg} rounded-full bg-green-800 hover:shadow-xl`}>
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 154 154">
                    <g fill="none" stroke="#22AE73" strokeWidth="12">
                        <circle className={`${stylesbtn['icon--order-success__svg__circle']}`} cx="77" cy="77" r="72" strokeDasharray={"480px 480px"} strokeDashoffset={"960px"}></circle>
                        <circle className={`${stylesbtn['icon--order-success__svg__circle']} ${stylesbtn['icon--order-success__svg__circle__colored']}`} fill="#22AE73" cx="77" cy="77" r="72" strokeDasharray={"480px 480px"} strokeDashoffset={"960px"} ></circle>
                        <polyline className={`st0 ${stylesbtn['icon--order-success__svg__polyline']}`} stroke="#fff" strokeWidth="10" points="43.5,77.8 63.7,97.9 112.2,49.4 " strokeDasharray={"100px 100px"} strokeDashoffset={"200px"} />
                    </g>
                </svg>
            </div>
        </div>
    )
}

const AnimationUnTicked = () => {
    return (
        <div 
        className={`${stylesbtn['animation-ctn']} w-10 h-10 p-1 rounded-full hover:bg-gray-200`}
        title={`This task is not completed.`}
        >
            {/* Credit for wallace.ho | https://codepen.io/wallaceho/pen/vxLbRO */}
            <div className={`${stylesbtn.svg} rounded-full bg-gray-900 hover:shadow-xl`}>
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 154 154">
                    <g fill="none" stroke="#6A717E" strokeWidth="12">
                        <circle className={`${stylesbtn['icon--order-success__svg__circle']}`} cx="77" cy="77" r="72" strokeDasharray={"480px 480px"} strokeDashoffset={"960px"} ></circle>
                        <circle className={`${stylesbtn['icon--order-success__svg__circle']} ${stylesbtn['icon--order-success__svg__circle__colored']}`} fill="#6A717E" cx="77" cy="77" r="72" strokeDasharray={"480px 480px"} strokeDashoffset={"960px"} ></circle>
                        <polyline className={`st0 ${stylesbtn['icon--order-success__svg__polyline']}`} stroke="#fff" strokeWidth="10" points="43.5,43.5 112.2,112.2" strokeDasharray={"100px 100px"} strokeDashoffset={"200px"} />
                        <polyline className={`st0 ${stylesbtn['icon--order-success__svg__polyline']}`} stroke="#fff" strokeWidth="10" points="43.5,112.2 112.2,43.5" strokeDasharray={"100px 100px"} strokeDashoffset={"200px"} />
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default SetStatusbtn;