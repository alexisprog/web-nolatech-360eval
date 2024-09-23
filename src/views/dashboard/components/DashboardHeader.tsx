type DashboardHeaderProps = {
  title?: string
  subtitle?: string
}

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div>
      <h4 className="mb-1">{title}</h4>
      <p>{subtitle}</p>
    </div>
  )
}

export default DashboardHeader
