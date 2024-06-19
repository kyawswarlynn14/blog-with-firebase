
const PageNotFound = () => {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
        <div className='flex items-center justify-center flex-col w-[80%] text-center mb-10'>
            <div className='w-[90%]'>
              <h1 className="font-bold tracking-[-0.3px] text-[20px] text-stone-800">Page Not Found...</h1>
              <p className="tracking-[-0.3px] text-[14px] text-stone-600">Please check your URL or try to go back.</p>
            </div>
        </div>
    </div>
  )
}

export default PageNotFound;