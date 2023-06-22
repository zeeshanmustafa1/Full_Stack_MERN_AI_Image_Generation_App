import React from 'react';

const FormFields = ({labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-900">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button type="button" onClick={handleSurpriseMe}
                  className="font-semibold text-xs bg-[#ECEF!] py-1 px-2 rounded-[5px] text-black">
            Surprise me
          </button>
        )}
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:reing-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
      </div>
    </div>
  );
};

export default FormFields;