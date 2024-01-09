// GraduationYearSelector.tsx

import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface GraduationYearSelectorProps {
  setGraduationYears: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
}

const GraduationYearSelector: React.FC<GraduationYearSelectorProps> = ({
  setSelectedYear,
}) => {
  const [selectedYear, setSelectedYearLocally] = useState<string>("");

  const years = generateGraduationYears();

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    const selectedYearValue = event.target.value;
    setSelectedYear(selectedYearValue); // 子コンポーネントから親コンポーネントへのコールバック
    setSelectedYearLocally(selectedYearValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="graduation_year">卒業年度</InputLabel>
      <Select
        //labelId="graduation-year-label"
        //id="graduation-year-select"
        value={selectedYear}
        label="卒業年度"
        onChange={handleYearChange}
      >
        <MenuItem value="">
          <em>すべて</em>
        </MenuItem>
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {`${year}年`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

function generateGraduationYears(): string[] {
  const currentYear = new Date().getFullYear();
  const years: string[] = Array.from({ length: 10 }, (_, index) =>
    (currentYear - index + 2).toString(),
  );
  return years;
}

export default GraduationYearSelector;
