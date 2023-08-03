'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Modal } from '.';

export default function AddPost() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [inputs, setInputs] = useState({ title: '', description: '' });

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post('/api/posts', inputs)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInputs({ title: '', description: '' });
        setModalOpen(false);
        router.refresh();
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white p-2 rounded-lg w-max px-4 hover:bg-blue-700 transition duration-150 ease-out"
      >
        AddPost
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <h1 className="capitalize text-2xl pb-3">Add new Post</h1>

          <input
            type="text"
            placeholder="Title"
            name="title"
            value={inputs.title || ''}
            onChange={handleChange}
            className="w-full p-2 rounded-lg"
          />
          <input
            name="description"
            id="description"
            value={inputs.description || ''}
            onChange={handleChange}
            placeholder="Enter your description here..."
            className="w-full flex items-start resize-none rounded-lg p-2"
          />

          <button className="bg-blue-500 text-white hover:bg-blue-700 transition duration-150 ease-out px-5 py-2 w-max rounded-lg">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
