"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function DateReserve({
  onNameChange,
  onNightChange,
  onDateChange,
  onHotelChange,
}: {
  onNameChange: Function;
  onNightChange: Function;
  onDateChange: Function;
  onHotelChange: Function;
}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [hotel, setHotel] = useState("MountainViewInn");
  const [nameLastname, setName] = useState<string>("");
  const [nights, setNight] = useState<number>(1);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    onNameChange(event.target.value);
  };

  const handleNightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNight(Number(event.target.value));
    onNightChange(event.target.value);
  };
  return (
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
      <TextField
        variant="standard"
        name="Name-Lastname"
        label="Name-Lastname"
        value={nameLastname}
        onChange={handleNameChange}
      ></TextField>
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
        <MenuItem value="MountainViewInn">Mountain View Inn</MenuItem>
        <MenuItem value="OceanBreezeResort">Ocean Breeze Resort</MenuItem>
        <MenuItem value="HotelSunshine">Hotel Sunshine</MenuItem>
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
