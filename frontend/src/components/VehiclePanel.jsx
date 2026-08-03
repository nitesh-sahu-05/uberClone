import React from 'react'

const VehiclePanel = (props) => {
  const vehicles = [
    {
      type: 'car',
      name: 'UberGo',
      seats: 4,
      distance: '2 min away',
      description: 'affordable compact rides',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zy6GeYezGhl4-rKsmJWNa1-3FkVaTF2UvlBPRWVf5w&s=10',
    },
    {
      type: 'motorcycle',
      name: 'UberBike',
      seats: 1,
      distance: '3 min away',
      description: 'affordable Moto rides',
      image: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n',
    },
    {
      type: 'auto',
      name: 'UberAuto',
      seats: 6,
      distance: '5 min away',
      description: 'affordable Auto rides',
      image: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn',
    },
  ];

  const getFareInfo = (vehicleType) => {
    const fare = props.fare[vehicleType];
    if (!fare) return { fare: 'N/A', difference: null };

    const validFares = vehicles
      .map(v => props.fare[v.type])
      .filter(f => f !== null && f !== undefined && f !== 'N/A');

    if (validFares.length === 0) {
      return { fare, difference: null };
    }

    const minFare = Math.min(...validFares);
    const difference = fare - minFare;

    return { fare, difference };
  };

  const getCheapestOption = () => {
    const validVehicles = vehicles.filter(
      v => props.fare[v.type] !== null && props.fare[v.type] !== undefined
    );
    
    if (validVehicles.length === 0) return null;

    const cheapest = validVehicles.reduce((min, vehicle) => 
      props.fare[vehicle.type] < props.fare[min.type] ? vehicle : min
    );

    return cheapest.type;
  };

  const cheapestType = getCheapestOption();

 

  

  return (
    <div>
      <h5 onClick={()=>{props.setVehiclePanelOpen(false)}} className='cursor-pointer p-3 text-center w-[90%]  absolute top-0'><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>


      {vehicles.map((vehicle) => {
        const { fare, difference } = getFareInfo(vehicle.type);
        const isCheapest = vehicle.type === cheapestType;

        return (
          <div key={vehicle.type} onClick={()=>{props.setSelectedVehicleType(vehicle.type); props.setSelectedVehicleFare(fare); props.setConfirmRidePanel(true)}} className={`flex border-2 mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer transition ${isCheapest ? 'border-green-500 bg-green-50' : 'border-black hover:bg-gray-50'}`}>
            <img className='h-12' src={vehicle.image} alt={vehicle.name} />
            <div className='ml-2 w-1/2'>
              <h4 className='text-base font-medium'>{vehicle.name} <span><i className="ri-user-fill"></i>{vehicle.seats}</span></h4>
              <h5 className='text-sm font-medium'>{vehicle.distance}</h5>
              <p className='text-xs font-medium text-gray-600 '>{vehicle.description}</p>
            </div>
            <div className='text-right'>
              <h2 className='text-xl font-bold'>
                {props.fareLoading ? '...' : `₹${fare}`}
              </h2>
              {difference !== null && difference > 0 && (
                <p className='text-xs text-red-600 font-semibold'>+₹{difference} more</p>
              )}
              {isCheapest && difference !== null && difference === 0 && (
                <p className='text-xs text-green-600 font-semibold'>💰 Cheapest</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default VehiclePanel


