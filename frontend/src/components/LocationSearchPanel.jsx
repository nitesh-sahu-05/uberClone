import React from 'react'

const LocationSearchPanel = ({
  suggestions = [],
  activeField,
  isLoading = false,
  error = '',
  onSelectSuggestion,
  setPanelopen,
}) => {
  return (
    <div className='px-3 pb-3'>
      {isLoading && <p className='py-2 text-sm text-gray-500'>Loading suggestions...</p>}
      {error && <p className='py-2 text-sm text-red-500'>{error}</p>}
      {!isLoading && !error && suggestions.length === 0 && (
        <p className='py-2 text-sm text-gray-500'>Type at least 3 characters to see suggestions.</p>
      )}

      {suggestions.map((elem, idx) => {
        const description = elem.description || elem.name || '';

        return (
          <div
            key={elem.placeId || `${description}-${idx}`}
            onClick={() => {
              onSelectSuggestion?.(description, activeField);
              setPanelopen?.(false);
            }}
            className='flex items-center border-2 border-gray-100 active:border-black p-3 rounded justify-start my-2 gap-3'
          >
            <h2 className='bg-[#eee] h-8 flex items-center justify-center ml-5 w-10 rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium'>{description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel
