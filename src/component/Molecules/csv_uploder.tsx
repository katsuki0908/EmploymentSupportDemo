import React from "react";
import Button from "@mui/material/Button";

interface UploadProps {
  onFileUpload: (file: File) => void;
}

export default function CsvUploader({ onFileUpload }: UploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input
        accept=".csv"
        id="contained-button-file"
        multiple
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          手動インポート
        </Button>
      </label>
    </div>
  );
}
