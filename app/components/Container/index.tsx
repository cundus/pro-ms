import React, { PropsWithChildren } from 'react'

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full p-4 bg-[#FBFAF5] rounded-xl shadow-lg border">
      {children}
    </div>
  )
}

export default Container
