import { FC } from 'react'
import ContentLoader from 'react-content-loader'

const PizzaBlockSkeleton: FC = () => (
  <ContentLoader
    speed={1}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f6f6f6"
    foregroundColor="#ffecbd"
  >
    <circle cx="135" cy="125" r="120" />
    <rect x="0" y="267" rx="5" ry="5" width="280" height="27" />
    <rect x="0" y="313" rx="5" ry="5" width="280" height="88" />
    <rect x="127" y="423" rx="22" ry="22" width="152" height="45" />
    <rect x="0" y="430" rx="10" ry="10" width="92" height="35" />
  </ContentLoader>
)

export default PizzaBlockSkeleton
