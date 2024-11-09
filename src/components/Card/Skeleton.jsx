import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={150}
    height={190}
    viewBox="0 0 150 190"
    backgroundColor="#bcb8b8"
    foregroundColor="#bcb8b8"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
    <rect x="0" y="100" rx="3" ry="3" width="150" height="15" /> 
    <rect x="0" y="125" rx="3" ry="3" width="90" height="15" /> 
    <rect x="0" y="160" rx="8" ry="8" width="80" height="25" /> 
    <rect x="115" y="155" rx="8" ry="8" width="32" height="32" />
  </ContentLoader>
)

export default Skeleton