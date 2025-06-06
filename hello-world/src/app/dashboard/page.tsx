

function BarChart () {
    return <h1>Bar Chart</h1>
}  //We can safely colocate project files inside route segments in the app 
//directory without worrying about them accidentally becoming routes themselves


const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard

//A route can become publicly accessible only when you add page.tsx or page.jsx to it.
