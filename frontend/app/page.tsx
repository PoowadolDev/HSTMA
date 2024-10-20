"use client";

import { useEffect, useState } from "react";
import { Ticket } from "./data/Tickets";
import axios from "axios";
import { Button } from "@nextui-org/button";
export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tickets');
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
    <>
        <div className="w-[calc(100%-5rem)] h-[calc(100vh-5rem)] bg-white rounded-lg shadow-lg m-10 overflow-auto text-slate-700">
        <Button color="primary">
          Button
        </Button>
          <table className="table w-full border-collapse table-pin-rows table-pin-cols border border-slate-300">
            <thead>
              <tr className="sticky top-0 bg-white border border-slate-300">
                <th className="border border-slate-300">ID</th>
                <th className="border border-slate-300">Title</th>
                <th className="border border-slate-300">Description</th>
                <th className="border border-slate-300">Contact</th>
                <th className="border border-slate-300">Created At</th>
                <th className="border border-slate-300">Updated At</th>
                <th className="border border-slate-300">Status</th>
                <th className="border border-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="border border-slate-300 p-2">{ticket.id}</td>
                  <td className="border border-slate-300 p-2">{ticket.title}</td>
                  <td className="border border-slate-300 p-2">{ticket.description}</td>
                  <td className="border border-slate-300 p-2">{ticket.contact_info}</td>
                  <td className="border border-slate-300 p-2">{new Date(ticket.created_at).toLocaleString()}</td>
                  <td className="border border-slate-300 p-2">{new Date(ticket.updated_at).toLocaleString()}</td>
                  <td className="border border-slate-300 p-2">{ticket.status}</td>
                  <td className="border border-slate-300 p-2">
                    <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="20" stroke-dashoffset="20" d="M3 21h18"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0"/></path><path stroke-dasharray="48" stroke-dashoffset="48" d="M7 17v-4l10 -10l4 4l-10 10h-4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.6s" values="48;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M14 6l4 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="8;0"/></path></g></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </>

  );
}
