import { Route, Routes } from "react-router-dom"

const RoutesNotFound = ({children}) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}
export default RoutesNotFound