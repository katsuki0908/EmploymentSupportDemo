import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ConfirmDialog } from "../mid/confirm_dialog";
import logger from "../../../logger";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null); // stateにFileまたはnull型を使用
  const [confirm_dialog, setconfirm_dialog] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]); // event.target.filesがundefinedでない場合にのみファイルを設定
    }
  };

  // const handleUpload = async () => {
  //   if (file) { // fileがnullでないことを確認
  //     const formData = new FormData();
  //     formData.append('file', file); // ここではfileはnullではないので追加
  //     logger.info(formData)
  //     const response = await fetch('/api/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     // 追加のエラーハンドリングが必要です
  //     if (!response.ok) {
  //       // エラー処理
  //     } else {
  //       // 成功時の処理
  //       logger.info(formData)

  //     }
  //   }
  // };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log("送信前のファイル:", file, formData);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("ファイルが正常に送信されました");
      } else {
        console.error("ファイルの送信に失敗しました");
      }
    }
  };

  const handleConfirmDialogOpen = () => {
    setconfirm_dialog(true);
  };

  const handleConfirmDialogClose = () => {
    setconfirm_dialog(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".xlsx" />
      <Button variant="contained" onClick={handleConfirmDialogOpen}>
        送信
      </Button>
      <ConfirmDialog
        open={confirm_dialog}
        onConfirm={handleUpload}
        onCancel={handleConfirmDialogClose}
        title="確認"
        message="本当に送信しますか？"
      />
    </div>
  );
};

export default FileUpload;
