import axios from "axios";
import { FormEvent, useState } from "react";

function TicketFormEdit({id, oldTitle, oldDescription, oldContact, oldStatus}: {id: string, oldTitle: string, oldDescription: string, oldContact: string, oldStatus: string}) {
    const [title, setTitle] = useState(oldTitle);
    const [description, setDescription] = useState(oldDescription);
    const [contact, setContact] = useState(oldContact);
    const [status, setStatus] = useState(oldStatus);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        console.log(title, description, contact);
        const response = await axios.put(`${process.env.BACKEND_API_URL}/api/tickets/${id}`, {
            title: title,
            description: description,
            contact_info: contact,
            status: status,
        });

        console.log(response.data);
        clearData();
    }

    const clearData = () => {
        setTitle('');
        setDescription('');
        setContact('');
    }

  return (
    <dialog id="my_modal_4" className="modal">
    <div className="modal-box rounded-lg border border-slate-200 bg-white">
        <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={clearData}>✕</button>
        </form>
        <h3 className="text-lg font-bold">Edit Ticket</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Title</span>
                </div>
                <input
                    type="text"
                    placeholder="Enter ticket title"
                    className="input input-bordered w-full max-w-xs bg-slate-50"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Description</span>
                </div>
                <textarea
                    placeholder="Enter ticket description"
                    className="textarea textarea-bordered w-full max-w-xs bg-slate-50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Contact</span>
                </div>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full max-w-xs bg-slate-50"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Status</span>
                </div>
                <select
                    className="select select-bordered w-full max-w-xs bg-slate-50"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </label>
            <button type="submit" className="btn btn-primary w-full max-w-xs">
                Update Ticket
            </button>
        </form>
    </div>
    </dialog>
  );
}

export default TicketFormEdit;