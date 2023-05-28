// 아직 미사용

import React, { useEffect } from 'react';
import Swal from "sweetalert2";

function Modal({ setIsToggled }) {
  useEffect(() => {
    let timerInterval;
    Swal.fire({
      title: '회원가입 완료!',
      html: '로그인 화면으로 이동합니다 :) ',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
        setIsToggled('login');
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        setIsToggled('login');
      }
    });
  }, []);

  // `return null;` 문장을 제거합니다.

}

export default Modal;
