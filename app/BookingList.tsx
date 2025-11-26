"use client";
import {useBookingList} from "./BookingContext";

export default function BookingList() {
  const {bookings} = useBookingList();

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="font-bold mb-2">Daftar Booking Ruangan</h3>
            <ul className="list-disc pl-6">
                {bookings.map((b) => (
                    <li key={b.id} className="mb-1">
                        {b.room} - {b.date} - {b.time}
                    </li>
                ))}
            </ul>
        </div>
    );
}