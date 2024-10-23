import axios from "axios";
import { FormEvent, useState } from "react";

function TicketForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        console.log(title, description, contact);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tickets`, {
            title: title,
            description: description,
            contact_info: contact,
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
    <dialog id="my_modal_3" className="modal">
    <div className="modal-box rounded-lg border border-slate-200 bg-white">
        <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={clearData}>✕</button>
        </form>
        <h3 className="text-lg font-bold">Create New Ticket</h3>
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
                    required
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
                    required
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
                    required
                />
            </label>
            <button type="submit" className="btn btn-primary w-full max-w-xs">
                Create Ticket
            </button>
        </form>
    </div>
    </dialog>
  );
}

export default TicketForm;