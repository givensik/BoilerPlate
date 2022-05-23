import {React, useEffect} from 'react';
import axios from 'axios';
// import { response } from 'express';

function LandingPage(){
    
    useEffect(()=>{ // LandingPage에 들어가자마자 이 함수를 실행하는거
        axios.get('/api/hello').then(response => console.log(response.data))
    },[])

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
