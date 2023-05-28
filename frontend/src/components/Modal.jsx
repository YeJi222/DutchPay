import React, { useEffect, useState } from 'react';

function Modal({showModal, setShowModal}) {
  return (
    <div>
      {showModal && (
        <div className="modal">
          {/* 모달 내용 */}
          알림창 내용
        </div>
      )}
      {/* 나머지 컴포넌트 */}
    </div>
  );
}

export default Modal;
