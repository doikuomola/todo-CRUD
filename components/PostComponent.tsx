'use client';

import { Post } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { Modal } from '.';

type PostComponentProps = {
  post: Post;
};

export default function PostComponent({ post }: PostComponentProps) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [postToEdit, setPostToEdit] = useState(post);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setPostToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .patch(`/api/posts/${post.id}`, postToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        router.refresh();
      });
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`/api/posts/${id}`)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalDelete(false);
        router.refresh();
      });
  };

  return (
    <li key={post.id} className="p-3 my-5 bg-slate-200 rounded-lg">
      <h1 className="text-xl md:text-2xl font-semibold md:font-bold">
        {post.title}
      </h1>
      <p className="text-sm md:text-base">{post.description}</p>

      <div className="flex gap-2 items-center py-2">
        <button
          className="text-blue-500"
          onClick={() => setOpenModalEdit(true)}
        >
          Edit
        </button>
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmit} className="w-full space-y-2">
            <h1 className="capitalize text-2xl pb-3">Add new Post</h1>

            <input
              type="text"
              placeholder="Title"
              name="title"
              value={postToEdit.title || ''}
              onChange={handleChange}
              className="w-full p-2 rounded-lg"
            />
            <input
              name="description"
              id="description"
              value={postToEdit.description || ''}
              onChange={handleChange}
              placeholder="Enter your description here..."
              className="w-full flex items-start resize-none rounded-lg p-2"
            />

            <button className="bg-blue-500 text-white hover:bg-blue-700 transition duration-150 ease-out px-5 py-2 w-max rounded-lg">
              Submit
            </button>
          </form>
        </Modal>
        <button
          className="text-red-500"
          onClick={() => setOpenModalDelete(true)}
        >
          Delete
        </button>
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h2 className="">Are you sure you want to delete this post?</h2>
          <div className="">
            <button
              className="text-blue-700 font-bold mr-5"
              onClick={() => handleDelete(post.id)}
            >
              Yes
            </button>
            <button
              className="text-red-700 font-bold mr-5"
              onClick={() => setOpenModalDelete(false)}
            >
              No
            </button>
          </div>
        </Modal>
      </div>
    </li>
  );
}
