import React, { PropsWithChildren } from 'react'

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full p-3 bg-sidebar rounded-xl shadow-lg border">
      {children}
    </div>
  )
}

export default Container
