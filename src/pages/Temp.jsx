import React, { useState } from 'react'
import {Link} from 'react-router-dom';


function Temp() {
  return (
    <>
    <Link to={'/myPage/'+ 1}><button>마이페이지</button></Link>
    <br></br>
    <br></br>
    <Link to={'/reviewList/'+ 2}><button>리뷰리스트</button></Link>
    </>
  )
}

export default Temp
