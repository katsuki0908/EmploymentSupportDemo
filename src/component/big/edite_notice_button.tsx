// EditDialog.jsx

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const EditDialog = ({ open, handleClose, handleSave, editedNotice, setEditedNoticeField }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>공지사항 편집</DialogTitle>
      <DialogContent>
        {/* 편집을 위한 폼 또는 컴포넌트를 추가하세요 */}
        {/* 예시: */}
        <input
          type="text"
          value={editedNotice?.title || ''}
          onChange={(e) => setEditedNoticeField('title', e.target.value)}
        />
        {/* 나머지 편집 필드도 유사하게 처리하세요 */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleSave}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
