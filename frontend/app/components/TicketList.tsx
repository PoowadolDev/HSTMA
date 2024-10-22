import { useMemo, useState } from "react";
import { Ticket } from "../data/Tickets";
import TicketFormEdit from "./TicketFormEdit";

type SortKeys = 'status' | 'created_at' | 'updated_at';
type SortOrder = 'asc' | 'desc';
const statusOptions = ['Pending', 'Accepted', 'Resolved', 'Rejected'];

function TicketList({ tickets }: { tickets: Ticket[] }) {
    const [sortKey, setSortKey] = useState<SortKeys>('created_at');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [filterText, setFilterText] = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

    const sortedTickets = useMemo(() => {
        let sortedData = [...tickets];
        sortedData.sort((a, b) => {
          if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
          if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
        return sortedData;
      }, [tickets, sortKey, sortOrder]);

      const filteredTickets = useMemo(() => {
        return sortedTickets.filter(ticket =>
          ticket.title.toLowerCase().includes(filterText.toLowerCase()) &&
          (selectedStatuses.length === 0 || selectedStatuses.includes(ticket.status))
        );
      }, [sortedTickets, filterText, selectedStatuses]);

    const handleSort = (key: SortKeys) => {
        if (sortKey === key) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortKey(key);
          setSortOrder('asc');
        }
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatuses(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4bg-white">
        <label className="input input-bordered input-sm flex items-center gap-2 w-48 bg-slate-100 m-2 text-slate-700">
            <input type="text"
            placeholder="Search by title..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="grow"/>
            </label>
        <div className="mt-2 ms-2">
          {statusOptions.map(status => (
            <label key={status} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status)}
                onChange={() => handleStatusChange(status)}
                className="checkbox checkbox-primary"
              />
              <span className="ml-2">{status}</span>
            </label>
          ))}
        </div>
      </div>
    <div className="flex-grow overflow-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
            <tr>
                <th className="bg-slate-100 text-slate-700">ID</th>
                <th className="bg-slate-100 text-slate-700">Title</th>
                <th className="bg-slate-100 text-slate-700">Description</th>
                <th className="bg-slate-100 text-slate-700">Contact</th>
                <th className="bg-slate-100 text-slate-700 cursor-pointer" onClick={() => handleSort('created_at')}>
                    Created At {sortKey === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="bg-slate-100 text-slate-700 cursor-pointer" onClick={() => handleSort('updated_at')}>
                    Updated At {sortKey === 'updated_at' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="bg-slate-100 text-slate-700 cursor-pointer" onClick={() => handleSort('status')}>
                    Status {sortKey === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="bg-slate-100 text-slate-700">Action</th>
            </tr>
        </thead>
            <tbody>
                {filteredTickets.length === 0 ? (
                    <tr>
                        <td colSpan={8} className="text-center p-4">No data or Database Issue</td>
                    </tr>
                ) : (
                    filteredTickets.map((ticket) => (
                        <tr key={ticket.id}>
                        <td className="border border-slate-300 p-2">{ticket.id}</td>
                        <td className="border border-slate-300 p-2">{ticket.title}</td>
                        <td className="border border-slate-300 p-2">{ticket.description}</td>
                        <td className="border border-slate-300 p-2">{ticket.contact_info}</td>
                        <td className="border border-slate-300 p-2">{new Date(ticket.created_at).toLocaleString()}</td>
                        <td className="border border-slate-300 p-2">{new Date(ticket.updated_at).toLocaleString()}</td>
                        <td className="border border-slate-300 p-2">{ticket.status}</td>
                        <td className="border border-slate-300 p-2">
                        <button
                          onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement)?.showModal()}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="20" strokeDashoffset="20" d="M3 21h18"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0"/></path><path strokeDasharray="48" strokeDashoffset="48" d="M7 17v-4l10 -10l4 4l-10 10h-4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.6s" values="48;0"/></path><path strokeDasharray="8" strokeDashoffset="8" d="M14 6l4 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="8;0"/></path></g></svg>
                        </button>
                        <TicketFormEdit
                          id={ticket.id}
                          oldTitle={ticket.title || ''}
                          oldDescription={ticket.description || ''}
                          oldContact={ticket.contact_info || ''}
                          oldStatus={ticket.status || ''}
                        />
                        </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
    </div>
  );
}

export default TicketList;
