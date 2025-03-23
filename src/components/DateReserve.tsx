"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function DateReserve({
  onNightChange,
  onDateChange,
  onHotelChange,
}: {
  onNightChange: Function;
  onDateChange: Function;
  onHotelChange: Function;
}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [hotel, setHotel] = useState("Mountain View Inn");
  const [nights, setNight] = useState<number>(1);

  const handleNightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNight(Number(event.target.value));
    onNightChange(event.target.value);
  };
  return (
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
      <TextField
        variant="standard"
        name="Nights"
        label="Nights"
        value={nights}
        onChange={handleNightChange}
      ></TextField>
      <Select
        variant="standard"
        name="hotel"
        id="hotel"
        value={hotel}
        className="h-[2em] w-[200px]"
        onChange={(e) => {
          setHotel(e.target.value);
          onHotelChange(e.target.value);
        }}
      >
        <MenuItem value="Mountain View Inn">Mountain View Inn</MenuItem>
        <MenuItem value="Ocean Breeze Resort">Ocean Breeze Resort</MenuItem>
        <MenuItem value="Hotel Sunshine">Hotel Sunshine</MenuItem>
      </Select>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white"
          value={reserveDate}
          onChange={(value) => {
            setReserveDate(value);
            onDateChange(value);
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
