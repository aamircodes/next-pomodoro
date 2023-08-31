import Image from 'next/image';

export default function Navigation() {
  return (
    <div>
      <div className='navbar justify-center space-x-1'>
        <button className='pb-1' onClick={() => window.location.reload()}>
          <Image src='/tomato.png' alt='logo' width={40} height={40} />
        </button>
        <a
          className='btn btn-ghost normal-case text-4xl'
          onClick={() => window.location.reload()}
        >
          FocusTime
        </a>
      </div>
      <div className='h-px bg-black bg-opacity-10'></div>
    </div>
  );
}
