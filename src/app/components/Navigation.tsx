import Image from 'next/image';

export default function Navigation() {
  return (
    <div className='navbar bg-base-100'>
      <button className='btn btn-square btn-ghost'>
        <Image src='/tomato.png' alt='logo' width={50} height={50} />
      </button>
      <a className='btn btn-ghost normal-case text-xl'>FocusTime</a>
    </div>
  );
}
