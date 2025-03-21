"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function DateReserve({
  onNameChange,
  onTelChange,
  onDateChange,
  onVenueChange,
}: {
  onNameChange: Function;
  onTelChange: Function;
  onDateChange: Function;
  onVenueChange: Function;
}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [venue, setVenue] = useState("Bloom");
  const [nameLastname, setName] = useState<string>("");
  const [tel, setTel] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    onNameChange(event.target.value);
  };

  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTel(event.target.value);
    onTelChange(event.target.value);
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
        name="Contact-Number"
        label="Contact-Number"
        value={tel}
        onChange={handleTelChange}
      ></TextField>
      <Select
        variant="standard"
        name="venue"
        id="venue"
        value={venue}
        className="h-[2em] w-[200px]"
        onChange={(e) => {
          setVenue(e.target.value);
          onVenueChange(e.target.value);
        }}
      >
        <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
        <MenuItem value="Spark">Spark Space</MenuItem>
        <MenuItem value="GrandTable ">The Grand Table</MenuItem>
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
