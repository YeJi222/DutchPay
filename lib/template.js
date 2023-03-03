module.exports = {
  HTML:function(title, subtitle, body, control, authStatusUI = `<a href="/auth/login">login</a>`){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
    <h2>
    ${title} 
    <div class="login">
      ${authStatusUI}
    </div>
    </h2>
    ${subtitle}
    ${body}
    ${control}
    </body>
    </html>
    <style>
      h2{
        color: green;
        margin-left: 10px;
      }
      h3{
        float: right;
        margin-right: 10px;
      }
      .login{
        font-size: 18px;
        float: right;
        margin-right: 10px;
      }
    </style>
    `;
  }, HTML_form:function(title, subtitle, body){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
    <h2>
    <h1>${title}</h1>
    <div class="login">
    </div>
    </h2>
    ${subtitle}
    ${body}
    </body>
    </html>
    <style>
      h1{
        text-align: center;
        color: purple;
      }
      h2{
        color: green;
        margin-left: 10px;
      }
      h3{
        float: right;
        margin-right: 10px;
      }
      .login{
        font-size: 18px;
        float: right;
        margin-right: 10px;
      }
    </style>
    `;
  }, moneyTable:function(member){
    var tag = `
    <table>
    <tr>
        <td class="top">Room No.</td>
        <td class="top">요청자</td></td>
        <td class="top">정산 내용</td>
        <td class="top">보낼 금액</td>
        <td class="top">계좌 번호</td>
        <td class="top">송금 내역</td>
        <td class="top">보내기</td>
    </tr>
    `;
    var check = '';
    var i = 0;
    while(i < member.length){
        var send = member[i].send;
        if(send == 0){
          check = 'no';
        } else{
          check = 'yes';
        }
        tag += `
            <tr>
                <td>${member[i].roomNo}</td>
                <td>${member[i].owner_phone}</td>
                <td>${member[i].content}</td>
                <td>${member[i].nMoney}</td>
                <td>${member[i].account}</td>
                <form action="/money/send_update" method="post" enctype="multipart/form-data">
                  <td>
                    <div class="container">
                      <input type="file" id="imgUpload" name="imgUpload" accept="image/*">
                      <div id="image-show" class="imgArea"></div>
                    </div>
                  </td>
                  <td>
                    <input type="hidden" name="id" value="${member[i].id}">
                    <input type="submit" value="Send" class="${check}">
                  </td>
                </form>
            </tr>
        `
        i++;
    }
    tag += '</table>';

    return tag;
  }, memberAddTable:function(phone){ 
    var tag = `
    <table>
    `;
    var i = 0;
    while(i < phone.length){
        tag += `
            <tr>
                <td class="phoneNo">${phone[i].phone}</td>
                
                <td>
                  <form action="/money/member_delete" method="post">
                    <input type="hidden" name="id" value="${phone[i].id}">
                    <input type="submit" value="ㅡ" class="delete_button">
                  </form>
                </td>
            </tr>
        `
        i++;
    }
    tag += '</table>';

    return tag;
  }, memberOkTable:function(phone){ 
    var tag = `
    <table>
    `;
    var i = 0;
    while(i < phone.length){
        tag += `
            <tr>
                <td class="phoneNo">${phone[i].phone}</td>     
                <td>
                  <form action="/money/member_delete" method="post">
                    <input type="hidden" name="id" value="${phone[i].id}">
                    <input type="submit" value="ㅡ" class="delete_button">
                  </form>
                </td>
            </tr>
        `
        i++;
    }
    tag += '</table>';

    return tag;
  }, memberEditTable:function(phone){ 
    var tag = `
    <table>
    `;
    var i = 0;
    while(i < phone.length){
        tag += `
            <tr>
                <td class="num">${phone[i].phone}</td>
                <td>
                  <form action="/money/money_update" method="post">
                    <input type="text" name="nMoney" value="${phone[i].nMoney}" class="nMoney">
                    <input type="hidden" name="id" value="${phone[i].id}">
                    <input type="hidden" name="roomId" value="${phone[i].roomNo}">
                    <input type="submit" value="Update" class="update_button">
                  </form>
                </td>
            </tr>
        `
        i++;
    }
    tag += '</table>';

    return tag;
  }, viewTable:function(member){
    var tag = `
    <table>
    <tr>
        <td class="top">Room No.</td>
        <td class="top">인원</td></td>
        <td class="top">정산 내용</td>
        <td class="top">총 금액</td>
        <td class="top">Enter</td>
    </tr>
    `;
    var i = 0;
    while(i < member.length){
        tag += `
            <tr>
                <td>${member[i].roomID}</td>
                <td>${member[i].totalPerson}</td>
                <td>${member[i].content}</td>
                <td>${member[i].totalMoney}</td>
                <td>
                  <form action="/money/enter" method="post">
                    <input type="hidden" name="id" value="${member[i].id}">
                    <input type="submit" value="Enter" class="enter_button">
                    <input type="hidden" name="roomId" value="${member[i].roomID}">
                    <input type="hidden" name="totalMoney" value="${member[i].totalMoney}">
                    <input type="hidden" name="content" value="${member[i].content}">
                  </form>
                </td>
            </tr>
        `
        i++;
    }
    tag += '</table>';

    return tag;
  }, memberViewTable:function(member){
    var tag = `
    <table>
    <tr>
        <td class="top">Member's Phone</td>
        <td class="top">정산 금액</td></td>
        <td class="top">송금 여부</td></td>
        <td class="top">송금 내역</td></td>
        <td class="top">확인</td></td>
    </tr>
    `;
    var check = '';
    var img = '';
    var i = 0;
    while(i < member.length){
      var send = member[i].send;
      if(send == 0){
        check = 'no';
        img = `
        <td>
          송금 내역 인증 전
        </td>
        `;
      } else{
        check = 'yes';
        img = `
        <td>
          <img src="data:${member[i].mimeType};base64,${member[i].imgData}" width=160" height="150">
        </td>
        `;
      }

        tag += `
            <tr>
                <td>${member[i].phone}</td>
                <td>${member[i].nMoney}</td>
                <td>
                  <div class = "${check}">
                    ${check}
                  </div>
                </td>
                ${img}
                <td>
                  <form action="/money/ok_delete" method="post">
                    <input type="hidden" name="id" value="${member[i].id}">
                    <input type="hidden" name="roomId" value="${member[i].roomNo}">
                    <input type="submit" value="OK" class="delete_button">
                  </form>
                </td>
            </tr>
        `
        i++;
    }
    tag += '</table>';

    return tag;
  },
}
