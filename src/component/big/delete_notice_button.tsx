// components/DeleteButton.tsx

import React from 'react';

interface DeleteButtonProps {
  noticeId: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ noticeId }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch('/api/notice', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notice_id: noticeId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // 성공한 경우 메시지 출력
      } else {
        const errorResult = await response.json();
        console.error(errorResult.error); // 실패한 경우 오류 메시지 출력
        console.log('delete ID : ', noticeId);
        console.log(typeof noticeId);
      }
    } catch (error) {
      console.error('Error occurred while deleting data:', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      delete
    </button>
  );
};

export default DeleteButton;
