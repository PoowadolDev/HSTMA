"use client";

import { useEffect, useState } from "react";
import { Ticket } from "./data/Tickets";
import axios from "axios";
import TicketList from "./components/TicketList";
import TicketForm from "./components/TicketForm";

export default function Home() {

  console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tickets`);
      setTickets(response.data);
      console.log(response.data);
    } catch (err) {
      setError('Failed to fetch tickets. Please try again later.');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="w-[calc(100%-5rem)] h-[calc(100vh-5rem)] bg-white rounded-lg shadow-lg overflow-hidden text-slate-700 flex flex-col">
      <div className="p-4 flex justify-between items-center bg-slate-50 border-b border-slate-200">
        <h2 className="text-xl font-semibold">Helpdesk Support Ticket Management Application</h2>
        <button
          onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create
        </button>
          <TicketForm />
      </div>
        <TicketList tickets={tickets} />
    </div>

  );
}