import React from 'react'

const CaptainDetail = () => {
  return (
    <div>
       <div className='flex items-center justify-between mt-5 mb-6'>
          <div className='flex items-center justify-start gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwuK6uK_DJOQbIPXKuHUtLCauwHZ3N7kXhBI8WP4bJ3g&s=10" alt="" />
            <h4 className='text-lg font-medium'>Nitesh sahu</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>150</h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>
        </div>

        <div className='flex p-4 bg-gray-100 rounded justify-center gap-5 items-start '>
            <div className='text-center'>
              <i className="text-3xl mb-3 font-extralight ri-time-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className="text-3xl mb-3 font-extralight ri-dashboard-3-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className="text-3xl mb-3 font-extralight ri-slideshow-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
        </div>
    </div>
  )
}

export default CaptainDetail
