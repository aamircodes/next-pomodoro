export default function Timer() {
  return (
    <div className='w-7/12 mx-auto card flex-col items-center bg-slate-300 p-4 gap-4'>
      <div className='flex w-10/12 justify-between'>
        <button className='btn btn-neutral'>pomodoro</button>
        <button className='btn btn-neutral'>short break</button>
        <button className='btn btn-neutral'>long break</button>
      </div>
      <h1 className='text-bold text-8xl m-0'>TIMER</h1>
      <div className='space-x-8'>
        {' '}
        <button className='btn btn-neutral'>Start/Pause</button>
        <button className='btn btn-neutral'>SKIP</button>
      </div>
      <p className='place-self-start'>Total working time: 01:05</p>
    </div>
  );
}
