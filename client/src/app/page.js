'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div>
      <h1 className='text-center'> Join the Chat Room</h1>
      <form className='z-[-1]'>
        <div>
          <input placeholder="name" className="joinInput my-4 input input-bordered input-accent w-full max-w-xs" type="text" onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <input placeholder="room" className="joinInput my-4 input input-bordered input-accent w-full max-w-xs" type="text" onChange={e => setRoom(e.target.value)} />
        </div>
        <Link href={`/chat?name=${name}&room=${room}`} onClick={e => (!name || !room) ? e.preventDefault() : null}>
          <button type='submit' className='btn btn-outline btn-info my-5 px-8 rounded-xl w-full'>Join</button>
        </Link>
      </form>
    </div>
  )
}
