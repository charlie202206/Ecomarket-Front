import React, { useState, useMemo, useContext} from "react";
import axios from 'axios';
import Table from '../components/Table';
import { useNavigate } from "react-router-dom";
import ContextAPI from "../ContextAPI";

function NewMemberList(props){

    const navigate = useNavigate();
    //글로벌변수(useContext) ==사용 start
    const context = useContext(ContextAPI);
    console.log(context);
    console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
    // ======= 사용 end

   const [data, setData] = useState([]);
   const [mode,setMode]=useState(props._mode);

   let contentControl1 = null;


   const columns = useMemo(
    () => [
      {
        accessor: "id",
        Header: "ID"
      },
      {
        accessor: "name",
        Header: "성명"
      },
      {
        accessor: "email",
        Header: "이메일"
      },
      {
        accessor: "phoneNumber",
        Header: "전화번호"
      },
      {
        accessor: "_links.self.href",
        Header: "상태변경",
        Cell: cell => (
          <div>
            <button onClick={()=>updateMember(cell.row.values)}>수정</button>
            <button onClick={()=>deleteMember(cell.row.values)}>삭제</button>
          </div>

        )
      },


    ],
    []
  );

  if(mode==="UPDATE"){
    setMode("READ");
    memberList();
  }else if(mode ==="UPDATEROW"){
    setMode("READ");
  }

 function updateMember(value){

   navigate('/SaveMember', {state:{value: value}})

 };

 function deleteMember(value){
    if(confirm("message"?"정말 삭제하시겠습니까?":"")){
    }else{
        return;
    }
    axios
    .delete('/members/deleteMemberById/'+value.id)
    .then((res) =>
    {
      //  alert(res);
       if(res.status == "204"){
         alert("정상 삭제되었습니다");
         setMode("UPDATE");
       }else{
         alert("오류");
       }
    }

    ).catch(console.log("error"))
    ;

 };


 function memberList(e){

  axios
      .get('/members/members')
      .then((res) => {
        // setName(res);
        console.log(res);
        setData(res.data.content);
        console.log(data);
      });
  }

  return(
    <div >
      <h1>
        회원리스트
      </h1>
      <form  onSubmit={event=>{
        event.preventDefault();
       memberList(event);
      }} >
        <td> <input type="submit" value= "전체조회"></input></td>
        <Table columns={columns} data={data || data} />
      </form>
      <div>
        {contentControl1}
      </div>
    </div>
  );

}
export default NewMemberList;
